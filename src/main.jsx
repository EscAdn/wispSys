import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Inicio from "./components/rutas/Inicio";
import Clientes from "./components/rutas/Clientes";
import Contratos from "./components/rutas/Contratos";
import Planes from "./components/rutas/Planes";
import Gastos from "./components/rutas/Gastos";
import Invoices from "./components/rutas/Invoices";
import TiposPagos from './components/rutas/TiposPagos';
import Configuracion from "./components/rutas/Configuracion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Inicio />} />
        <Route path="clients" element={<Clientes />} />
        <Route path="contracts" element={<Contratos />} />
        <Route path="plans" exact element={<Planes />} />
        {/*<Route path="invoices" element={<Invoices />} />*/}
        <Route path="gastos" element={<Gastos />} />
        <Route path="types" element={<TiposPagos />} />
        <Route path="config" element={<Configuracion />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
