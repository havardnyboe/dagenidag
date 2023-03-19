import { historie, historieYear } from "../components";

enum WikiType {
  historie,
  norsk,
  fødsel,
  dødsfall,
}

function convertStringToHistorie(str: string) {
  let hist: historie = { year: [0], content: "" };
  let items = str.split(/–(.*)/s).map((str) => str.trim()); // obs må være – og ikke -
  hist.year = historieYear(items.shift()!.split(" ")); // håndterer edge-case hvor årstall inneholder f.kr.
  items = items
    .join(" ")
    .replace(/(?:\[)([0-9])(?:])/, "") // fjerner referanse markeringer ([1] osv.)
    .split(". ");
  let content = items.shift();
  while (items.at(0)) {
    if ((content! + items.at(0)).length <= 200)
      content += items.shift()?.trim() + ". ";
    else items.shift();
  }
  hist.content = content!;

  return hist;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function byYear(a: historie, b: historie) {
  if (a.year[0] > b.year[0]) return 1;
  else if (a.year[0] < b.year[0]) return -1;
  else return 0;
}

function nextSibling(element: any) {
  return element.nextElementSibling;
}

// Henter et liste-element (ul) ut i fra en gitt id og returnerer den som en tekst-streng
function getHistorie(
  page: Document,
  type: WikiType,
  test: boolean
): Array<string> {
  let content: HTMLElement;
  switch (type) {
    case WikiType.historie:
      content = test
        ? page.querySelector("#Historie")?.parentElement!
        : page.querySelector("#Historie")?.parentElement?.parentElement!;
      break;
    case WikiType.norsk:
      content = page.querySelector("#Norsk_historie")?.parentElement!;
      break;
  }
  while (content! && content?.tagName != "UL") {
    content = nextSibling(content);
  }
  return content!?.textContent?.split("\n") || new Array<string>();
}

// returnerer en Promise med en liste fem med historie objekter,
// der første historie alltid eldste hendelse og siste alltid er nyeste
// og resten er tilfeldig valgt
export async function historienIdag(
  url: URL = new URL(
    "https://no.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=Wikipedia:Dagen_i_dag"
  ),
  test: boolean = false
): Promise<historie[]> {
  const dagen_i_dag = fetch(url)
    .then((res) => res.json())
    .then((res) => res.parse.text["*"]);
  const parser = new DOMParser();
  const page = parser.parseFromString(await dagen_i_dag, "text/html");
  const content =
    getHistorie(page, WikiType.historie, test)
      .map((hist) => convertStringToHistorie(hist))
      .concat(
        getHistorie(page, WikiType.norsk, test).map((hist) =>
          convertStringToHistorie(hist)
        )
      ) || new Array<historie>();
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
