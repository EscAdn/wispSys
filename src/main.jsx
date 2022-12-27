import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Clientes } from './conponents/rutas/Clientes'
import { Inicio } from './conponents/rutas/Inicio'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route index element={<Inicio />} />
      <Route path="clientes" element={<Clientes />} />
        {/* <Route path="contratos" element={<Contratos />} />
        <Route path="planes" element={<Planes />} />
        <Route path="gastos" element={<Gastos />} />
        <Route path="usuarios" element={<Usuarios />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
)
