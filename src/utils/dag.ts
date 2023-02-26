import Holidays from "date-holidays";

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

let hd = new Holidays("no");
hd.setHoliday("03-08", "Kvinnedagen");
hd.setHoliday("04-01", "Aprilsnarr");
const helligdag = hd.isHoliday(new Date());

const datoString = new Date().toLocaleDateString("no-NB", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const start = new Date(new Date().getFullYear(), 0, 0);
const enDag = 1000 * 60 * 60 * 24;
const idag = Math.floor((new Date().getTime() - start.getTime()) / enDag);
const igjen = isLeapYear(new Date().getFullYear()) ? 366 - idag : 365 - idag;
const idagLang = new Date().toLocaleDateString("no-NB", {
  month: "long",
  day: "numeric",
});

export { helligdag, datoString, igjen, idag, idagLang };
