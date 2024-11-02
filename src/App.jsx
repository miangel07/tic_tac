import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Tablero from "./components/Tablero";

const  App=() =>{
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Tablero />} />
      </Routes>
    </>
  );
}

export default App;
