import "./App.sass";
import navnedag from "../public/navnedager.json";
import idagLogo from "./img/idag.gif";
import { historienIdag } from "./utils/wiki";
import { Historie, Sitat } from "./components";
import { datoString, helligdag, idag, idagLang, igjen } from "./utils/dag";

function App() {
  const navnedager: { [index: string]: string } = navnedag;
  const historier = historienIdag();

  return (
    <div className="App">
      <div className="tittel">
        <div>
          <h1>
            <img width="180px" src={idagLogo} alt="IDAG" />
          </h1>
          <div>{datoString}</div>
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
      {historier?.map((hist, i) => <Historie key={i} year={hist.year} content={hist.content} />)}
      <div>
      <div className="banner"></div>
      </div>
      <Sitat
        author="Marve Almar Fleksnes"
        content="Ikke host i øst og vest, lommetørkle beskytter best!"
      />
    </div>
  );
}

export default App;
