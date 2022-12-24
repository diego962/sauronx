import React, { useState, useEffect } from "react";
import {IconContext} from "react-icons";
import {Link} from "react-router-dom";
import {BsPlus} from "react-icons/bs";
import axios from "axios";
import "../../assets/css/main.css";

const Integracoes = () => {
  const [integracoes, setIntegracoes] = useState([]);

  const getIntegracoes = async () => {
    await axios.get("/api/integracoes")
    .then((response) => {
      setIntegracoes(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    getIntegracoes();
  },[]);

  return(
    <>
    <div className="container">
      <Link className="navbar-brand" to="/integracoes_cadastro">
        <IconContext.Provider value={{className: 'adicionar'}}>
          <BsPlus />
        </IconContext.Provider>
      </Link>
    </div>

    <div className="container">
      <div className="row">
      <div className="col-8">
      <div className="list-group">
        {integracoes.map((integracao) => (
          <Link
            key={integracao.integracao_id}
            className="list-group-item list-group-item-action"
            to={`/integracao/info/${integracao.integracao_id}`}>
            {integracao.integracao_nome}
            </Link>
        ))}
      </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default Integracoes;
