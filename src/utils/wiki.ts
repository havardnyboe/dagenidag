import wiki from "wikipedia";
import { historie } from "../components";

wiki.setLang("no");
const Dagen_i_dag = await wiki
  .page("Wikipedia:Dagen_i_dag")
  .then((res) => res.html());

function convertStringToHistorie(str: string) {
  let hist: historie = { year: 0, content: "" };
  const items = str.split("–").map((str) => str.trim());
  hist.year = Number(items[0]);
  hist.content = items[1];

  return hist;
}

export function historienIdag(): historie[] | undefined {
  const parser = new DOMParser();
  const page = parser.parseFromString(Dagen_i_dag, "text/html");
  const content = page.querySelector("#Historie")
    ?.parentElement?.parentElement?.nextElementSibling?.textContent?.split("\n");
  const historie = content?.map((hist) => convertStringToHistorie(hist));

  return historie;
}
