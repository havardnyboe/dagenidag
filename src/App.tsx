import "./App.sass";
import navnedag from "../public/navnedager.json";
import idagLogo from "./img/idag.gif";
import { historienIdag } from "./utils/wiki";
import { historie, Historie, Sitat } from "./components";
import { datoString, helligdag, idag, idagLang, igjen } from "./utils/dag";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

const sitat = document.querySelector("#sitat");

function App() {
  const navnedager: { [index: string]: string } = navnedag;
  const [historier, setHistorier] = useState(Array<historie>);

  const sitatTekst =
    sitat?.firstElementChild?.nextElementSibling?.firstElementChild
      ?.firstElementChild?.nextElementSibling?.childNodes[0].textContent;
  const sitatAv =
    sitat?.firstElementChild?.nextElementSibling?.firstElementChild
      ?.firstElementChild?.nextElementSibling?.childNodes[3].textContent;

  useEffect(() => {
    historienIdag().then((hist) => {
      setHistorier(hist);
    });
  }, []);

  return (
    <div className="App">
      <div className="tittel">
        <div>
          <h1>
            <img className="iDag" src={idagLogo} alt="IDAG" />
          </h1>
          <div>{datoString}</div>
        </div>
        <div>
          <div className="igjen">
            {idag}. dag i året, {igjen} igjen
          </div>
          <div className="navnedag">
            <div className="helligdag">
              {helligdag ? helligdag[0].name : <br />}
            </div>
            <div>Navnedag:</div>
            <div>{navnedager[idagLang]}</div>
          </div>
        </div>
      </div>
      <div className="banner"></div>
      {<script src="https://www.ordtak.no/dagens/humor/"></script>}
      {historier.length > 0 ? (
        historier?.map((hist, i) => (
          <Historie key={i} year={hist.year} content={hist.content} />
        ))
      ) : (
        <Historie
          year={Number("404")}
          content={"Kloink! Ser ut som det ikke har lastet noe enda!"}
        />
      )}
      <div className="banner"></div>
      <Sitat
        author={sitatAv || "Marve Almar Fleksnes"}
        content={sitatTekst || "Ikke host i øst og vest, lommetørkle beskytter best!"}
      />
      <Footer />
    </div>
  );
}

sitat?.remove();

export default App;
