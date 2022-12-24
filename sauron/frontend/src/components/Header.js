import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Sauron</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clientes">Clientes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/alertas">Alertas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/playbooks">Playbooks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tickets">Tickets</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tarefas">Tarefas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/integracoes">Integrações</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/templates">Templates</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
