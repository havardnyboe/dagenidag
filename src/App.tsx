import "./App.sass";
import ndjson from "../public/navnedager.json";
import Holidays from "date-holidays";
import idagLogo from "./img/idag.gif";

function isLeapYear(year: number) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

interface historie {
  year: number;
  content: string;
}

interface sitat {
  author: string;
  content: string;
}

function Historie(props: historie) {
  return (
    <div className="historie">
      <span>{props.year}</span>
      <p>{props.content}</p>
    </div>
  );
}

function Sitat(props: sitat) {
  return (
    <div className="sitat">
      <p>
        {props.content}
        <span>{props.author}</span>
      </p>
    </div>
  );
}

function App() {
  const navnedager: { [index: string]: string } = ndjson;
  let helligdag = null;

  const hd = new Holidays("no");
  console.log(hd.getHolidays(2023));
  hd.getHolidays().forEach((h) => {
    new Date(String(h?.date)).toLocaleDateString() ===
    new Date().toLocaleDateString()
      ? (helligdag = h.name)
      : "";
  });

  const dato = new Date(Date.now()).toLocaleDateString("no-NB", {
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

  return (
    <div className="App">
      <div className="tittel">
        <div>
          <h1>
            <img width="180px" src={idagLogo} alt="IDAG" />
          </h1>
          <div>{dato}</div>
        </div>
        <div>
          <div className="igjen">
            {idag}. dag i året, {igjen} igjen
          </div>
          <div className="navnedag">
            <div className="helligdag">{helligdag ? helligdag : <br />}</div>
            <div>Navnedag:</div>
            <div>{navnedager[idagLang]}</div>
          </div>
        </div>
      </div>
      <div className="banner"></div>
      <Historie
        year={1709}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati eaque doloribus autem, sapiente ipsa voluptatum inventore."
        }
      />
      <Historie
        year={1816}
        content={
          "Alias beatae doloribus, possimus repellendus consequuntur nemo iure? Corrupti suscipit voluptates ullam error."
        }
      />
      <Historie year={2023} content={"Tekst-TV blir borte :("} />
      <div className="banner"></div>
      <Sitat
        author="Marve Almar Fleksnes"
        content="Ikke host i øst og vest, lommetørkle beskytter best!"
      />
    </div>
  );
}

export default App;
