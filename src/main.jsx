import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Configuracion from "./conponents/rutas/Configuracion";
import Planes from "./conponents/rutas/Planes";
import Clientes from "./conponents/rutas/Clientes";
import Contratos from "./conponents/rutas/Contratos";
import Gastos from "./conponents/rutas/Gastos";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<Inicio />} /> */}
        <Route path="clients" element={<Clientes />} />
        <Route path="contracts" element={<Contratos />} />
        <Route path="plans" element={<Planes />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="config" element={<Configuracion />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
