import React from "react";

import { NavLink } from "react-router-dom";

export const LateralMenu = () => {
  function menuBtnChange() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    sidebar.classList.toggle("open");
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("fa-chevron-right", "fa-chevron-left"); //replacing the iocns class
    } else {
      closeBtn.classList.replace("fa-chevron-left", "fa-chevron-right"); //replacing the iocns class
    }
  }

  return (
    <div className="sidebar">
      <div className="logo-details">
        <i className="fas fa-wifi icon"></i>
        <div className="logo_name">WispSys</div>
        <i
          className="fas fa-chevron-right"
          onClick={menuBtnChange}
          id="btn"
        ></i>
      </div>

      <ul className="nav-list">
        <li>
          <NavLink to="/">
            <i className="fas fa-chart-area"></i>
            <span className="links_name">Generales</span>
          </NavLink>
          <span className="tooltip">Generales</span>
        </li>
        <li>
          <NavLink to="/clients">
            <i className="fas fa-users-between-lines"></i>
            <span className="links_name">Clientes</span>
          </NavLink>
          <span className="tooltip">Clientes</span>
        </li>
        <li>
          <NavLink to="/contracts">
            <i className="fas fa-handshake"></i>
            <span className="links_name">Contratos</span>
          </NavLink>
          <span className="tooltip">Contratos</span>
        </li>
        <li>
          <NavLink to="/plans">
            <i className="fas fa-wifi"></i>
            <span className="links_name">Planes</span>
          </NavLink>
          <span className="tooltip">Planes</span>
        </li>
        <li>
          <NavLink to="/gastos">
            <i className="fas fa-dollar-sign"></i>
            <span className="links_name">Gastos</span>
          </NavLink>
          <span className="tooltip">Gastos</span>
        </li>
        <li>
          <NavLink to="/types">
            <i className="fas fa-cash-register"></i>
            <span className="links_name">Formas de Pagos</span>
          </NavLink>
          <span className="tooltip">Formas de Pagos</span>
        </li>
        <li>
          <NavLink to="config">
            <i className="fas fa-location-dot"></i>
            <span className="links_name">Direcciones</span>
          </NavLink>
          <span className="tooltip">Direcciones</span>
        </li>
        {/*<li>
          <NavLink to="/address">
            <i className="fas fa-location-dot"></i>
            <span className="links_name">Direcciones</span>
          </NavLink>
          <span className="tooltip">Direcciones</span>
        </li>*/}
        {/*<li>
          <NavLink to="/nodes">
            <i className="fas fa-circle-nodes"></i>
            <span className="links_name">Nodos</span>
          </NavLink>
          <span className="tooltip">Nodos</span>
        </li>*/}
        <li>
          <NavLink to="/nodes">
            <i className="fas fa-users-gear"></i>
            <span className="links_name">Usuarios</span>
          </NavLink>
          <span className="tooltip">Usuarios</span>
        </li>
      </ul>
    </div>
  );
};
