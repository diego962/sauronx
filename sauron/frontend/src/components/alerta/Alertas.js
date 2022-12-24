import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {BsPlus} from "react-icons/bs";
import {IconContext} from "react-icons";
import axios from "axios";
import "../../assets/css/main.css";

const Alertas = () => {
  const [alertas, setAlertas] = useState([]);

  const getAlertas = async () => {
    await axios.get("/api/alertas")
    .then((response) => {
      setAlertas(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    getAlertas();
  },[]);

  return (
    <>
    <div className="container">
      <Link className="navbar-brand" to="/alerta_cadastro">
        <IconContext.Provider value={{className: 'adicionar'}}>
          <BsPlus />
        </IconContext.Provider>
      </Link>
    </div>

    <div className="container">
      <div className="row">
      <div className="col-8">
      <div className="list-group">
        {alertas.map((alerta) => (
          <Link
            key={alerta.id}
            className="list-group-item list-group-item-action"
            to={`/alerta/info/${alerta.id}`}>
            {alerta.alerta_nome}
            </Link>
        ))}
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default Alertas;
