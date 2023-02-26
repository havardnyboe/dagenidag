import { historie } from "../components";

function convertStringToHistorie(str: string) {
  let hist: historie = { year: 0, content: "" };
  const items = str.split("–").map((str) => str.trim());
  hist.year = Number(items[0]);
  hist.content = items[1].replace(/(?:\[)([0-9])(?:])/, "");

  return hist;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function byYear(a: historie, b: historie) {
  if (a.year > b.year) return 1;
  else if (a.year < b.year) return -1;
  else return 0;
}

function nextSibling(element: any) {
  return element.nextElementSibling;
}

function getContent(page: Document): Array<string> {
  let content = page.querySelector("#Historie")?.parentElement?.parentElement;
  while (content?.tagName != "UL") {
    content = nextSibling(content);
  }
  return content?.textContent?.split("\n") || new Array<string>();
}

export async function historienIdag(): Promise<historie[]> {
  const dagen_i_dag = fetch(
    "https://no.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=Wikipedia:Dagen_i_dag"
  )
    .then((res) => res.json())
    .then((res) => res.parse.text["*"]);
  const parser = new DOMParser();
  const page = parser.parseFromString(await dagen_i_dag, "text/html");
  const content = getContent(page);
  const temp =
    content.map((hist) => convertStringToHistorie(hist)) ||
    new Array<historie>();

  let historie: any = [];
  historie.push(temp.pop());
  historie.push(temp.shift());
  const len = temp.length > 3 ? 3 : temp.length;
  for (let i = 0; i < len; i++) {
    const random = getRandomInt(0, temp.length - 1);
    historie.push(temp?.splice(random, 1)[0]);
  }
  historie.sort(byYear);

  return historie;
}
