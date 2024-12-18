import { historie, historieYear } from "../components";

enum WikiType {
  historie,
  norsk,
  amerikanskePresidenter,
  fødsel,
  dødsfall,
}

function convertStringToHistorie(str: string) {
  let historie: historie = { year: [0], content: "" };
  let items = str.split(/–(.*)|—(.*)|-(.*)/s).map((str) => (str ? str.trim() : "")); // splitter på – og — og -
  items = items.filter((item) => item !== "");
  historie.year = historieYear(items.shift()!.split(" ")); // håndterer edge-case hvor årstall inneholder f.kr.
  items = items
    .join(" ")
    .replace(/(?:\[)(\d)(?:])/, "") // fjerner referanse markeringer ([1] osv.)
    .replace("[3]", "") // av en eller annen grunn ble ikke denne fjernet automatisk fra 1. januar
    .split(". ");
  let content = items.shift()?.trim() + ". ";
  while (items.at(0)) {
    if ((content! + items.at(0)).length <= 200) content += items.shift()?.trim() + ". ";
    else items.shift();
  }
  historie.content = content.slice(0, -2)!; // slicer vekk siste punktum

  return historie;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sorterer historier basert på årstall
 */
function byYear(a: historie, b: historie) {
  if (a.year[1] && b.year[1]) {
    if (a.year[1] > b.year[1]) return 1;
    else if (a.year[1] < b.year[1]) return -1;
    else return 0;
  } else if (a.year.length > 1) return -1;
  else if (b.year.length > 1) return 1;
  else {
    if (a.year[0] > b.year[0]) return 1;
    else if (a.year[0] < b.year[0]) return -1;
    else return 0;
  }
}

function nextSibling(element: any) {
  return element.nextElementSibling;
}

/**
 * Henter et liste-element (ul) ut i fra en gitt id og returnerer den som en tekst-streng
 */
function getHistorie(page: Document, type: WikiType): Array<string> {
  let content: HTMLElement;
  switch (type) {
    case WikiType.historie:
      content = page.querySelector("#Historie")?.parentElement!;
      break;
    case WikiType.norsk:
      content = page.querySelector("#Norsk_historie")?.parentElement!;
      break;
    case WikiType.amerikanskePresidenter:
      content = page.querySelector("#Amerikanske_presidenter")?.parentElement!;
  }
  while (content! && content?.tagName != "UL") {
    content = nextSibling(content);
  }
  return content!?.textContent?.split("\n") || new Array<string>();
}

/**
 * returnerer en Promise med en liste fem med historie objekter,
 * der første historie alltid eldste hendelse og siste alltid er nyeste
 * og resten er tilfeldig valgt
 */
export async function historienIdag(dato: string): Promise<historie[]> {
  const dagen_i_dag = fetch(
    new URL(`https://no.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=${dato}`)
  )
    .then((res) => res.json())
    .then((res) => res.parse.text["*"]);
  const parser = new DOMParser();
  const page = parser.parseFromString(await dagen_i_dag, "text/html");
  let content: historie[] = getHistorie(page, WikiType.historie).map((hist) => convertStringToHistorie(hist));
  content = content.concat(getHistorie(page, WikiType.norsk).map((hist) => convertStringToHistorie(hist)));
  content = content.concat(getHistorie(page, WikiType.amerikanskePresidenter).map((hist) => convertStringToHistorie(hist)));

  content.sort(byYear); // sorterer den kombinerte listen

  let historie: historie[] = [];
  historie.push(content.pop()!); // henter første
  historie.push(content.shift()!); // henter siste
  const len = content.length > 3 ? 3 : content.length;
  for (let i = 0; i < len; i++) {
    const random = getRandomInt(0, content.length - 1);
    historie.push(content?.splice(random, 1)[0]);
  }
  historie.sort(byYear);

  return historie;
}
