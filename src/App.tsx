import { useState } from "react";
import "./App.sass";

function App() {
  const date = new Date(Date.now()).toLocaleDateString("no-NB", { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="App">
      <h1>IDAG</h1>
      <div>{date}</div>
    </div>
  );
}

export default App;
