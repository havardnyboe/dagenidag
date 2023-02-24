import Holidays from "date-holidays";

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

let helligdag: string | null;

const hd = new Holidays("no");
hd.getHolidays().forEach((h) => {
  new Date(String(h?.date)).toLocaleDateString() ===
  new Date().toLocaleDateString()
    ? (helligdag = h.name)
    : (helligdag = null);
});

const datoString = new Date(Date.now()).toLocaleDateString("no-NB", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const start = new Date(new Date().getFullYear(), 0, 0);
const enDag = 1000 * 60 * 60 * 24;
const idag = Math.floor((new Date().getTime() - start.getTime()) / enDag);
const igjen = isLeapYear(new Date().getFullYear()) ? 366 - idag : 365 - idag;
const idagLang = new Date(Date.now()).toLocaleDateString("no-NB", {
  month: "long",
  day: "numeric",
});

export { helligdag, datoString, igjen, idag, idagLang }
