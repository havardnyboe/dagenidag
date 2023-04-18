import { useEffect, useState } from "react";
import style from "./App.module.sass";
import navnedag from "../public/navnedager.json";
import sitat from "../public/sitater.json";
import idagLogo from "./img/idag.gif";
import { historienIdag } from "./utils/wiki";
import { historie, Historie, Sitat } from "./components";
import { datoString, helligdag, idag, idagLang, igjen } from "./utils/dag";
import Footer from "./components/Footer";
import loading from "./img/103.gif";

function App() {
  const navnedager: { [index: string]: string } = navnedag;
  const sitater: { [index: string]: { author: string; content: string } } =
    sitat;
  const [historier, setHistorier] = useState(Array<historie>);

  const sitatTekst =
    document.querySelector("#sitat")?.firstElementChild?.nextElementSibling
      ?.firstElementChild?.firstElementChild?.nextElementSibling?.childNodes[0]
      .textContent;
  const sitatAv =
    document.querySelector("#sitat")?.firstElementChild?.nextElementSibling
      ?.firstElementChild?.firstElementChild?.nextElementSibling?.childNodes[3]
      .textContent;

  useEffect(() => {
    historienIdag(idagLang.replace(" ", "_")).then((hist) => {
      setHistorier(hist);
    });
  }, []);

  return (
    <main className={style.App}>
      <section className={style.tittel}>
        <div>
          <div>
            <img className={style.iDag} src={idagLogo} alt="IDAG" />
          </div>
          <span data-testid="dagensDato">{datoString}</span>
        </div>
        <div>
          <div className={style.igjen}>
            {idag}. dag i året, {igjen} igjen
          </div>
          <div className={style.navnedag}>
            <div className={style.helligdag}>
              {helligdag ? helligdag[0].name : <br />}
            </div>
            <div>Navnedag:</div>
            <div data-testid="navnedag">{navnedager[idagLang]}</div>
          </div>
        </div>
      </section>
      <div className={style.banner}></div>
      {<script src="https://www.ordtak.no/dagens/humor/"></script>}
      {historier.length > 0 ? (
        historier?.map((hist, i) => (
          <Historie key={i} year={hist.year} content={hist.content} />
        ))
      ) : (
        <img className={style.laster} src={loading} alt="laster" />
      )}
      <div className={style.banner}></div>
      <Sitat
        author={sitater[idagLang].author || sitatAv || "Marve Almar Fleksnes"}
        content={sitater[idagLang].content || sitatTekst || "Ikke host i øst og vest, lommetørkle beskytter best!"}
      />
      <Footer />
    </main>
  );
}

// document.querySelector("#sitat")?.remove();

export default App;
