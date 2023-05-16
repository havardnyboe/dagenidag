import Holidays from "date-holidays";

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
const input = String(location.search.split("").slice(1).join(""));
const date =
  String(new Date(input).getTime()) === "NaN" ? new Date() : new Date(input);

let hd = new Holidays("no");
const helligdag = hd.isHoliday(date);
if (helligdag && helligdag[0].name.toLowerCase() == "17. mai") {
  helligdag[0].name = "Grunnlovsdagen"; // date-holidays bruker 17. mai som navn, unngår repeterende navn
}

const datoString = date.toLocaleDateString("no-NB", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const start = new Date(date.getFullYear(), 0, 0);
const enDag = 1000 * 60 * 60 * 24;
const idag = Math.floor((date.getTime() - start.getTime()) / enDag);
const igjen = isLeapYear(date.getFullYear()) ? 366 - idag : 365 - idag;
const idagLang = date.toLocaleDateString("no-NB", {
  month: "long",
  day: "numeric",
});

export { helligdag, datoString, igjen, idag, idagLang };
