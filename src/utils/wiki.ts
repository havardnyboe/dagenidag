import { historie } from "../components";

const dagen_i_dag = (await fetch("https://no.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=Wikipedia:Dagen_i_dag").then(res => res.json())).parse.text["*"];


function convertStringToHistorie(str: string) {
  let hist: historie = { year: 0, content: "" };
  const items = str.split("–").map((str) => str.trim());
  hist.year = Number(items[0]);
  hist.content = items[1];

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

export function historienIdag(): historie[] {
  const parser = new DOMParser();
  const page = parser.parseFromString(dagen_i_dag, "text/html");
  const content = page.querySelector("#Historie")
    ?.parentElement?.parentElement?.nextElementSibling?.textContent?.split("\n");
  const historie = content?.map((hist) => convertStringToHistorie(hist)) || new Array<historie>;
  
  let tmp: any[] = [];
  tmp.push(historie.pop());
  tmp.push(historie.shift());
  const len = historie.length > 3 ? 3 : historie.length;
  for (let i = 0; i < len; i++) {
    const random = getRandomInt(0, historie.length-1);
    tmp.push(historie?.splice(random, 1)[0])
  }
  tmp.sort(byYear);

  return tmp;
}
