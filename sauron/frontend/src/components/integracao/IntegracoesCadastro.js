import React,{useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

import GLPI from "../sistema/GLPI";

const IntegracoesCadastro = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [campos, setCampos] = useState(["teste"])
  const tiposIntegracoes = [{"value": "glpi", "label":"glpi"}]

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let form = new FormData(evt.target);
    axios.post("/api/integracoes_cadastro", form)
    .then((res) => {
      if (res.status === 200){
        setIsRedirect(true);
      } else {
        console.log("Erro: " + res.status);
      }
    })
  }

  const handleTipoIntegracao = (evt) => {
    axios.get("/api/tipos_integracoes?integracao_nome=" + evt.value)
    .then((response) => {
      setCampos(response.data);
      setLoading(true);
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
        <legend>Cadastro de integração</legend>
        <div className="mb-3">
          <label htmlFor="tipo_integracao" className="form-label">Tipo de integração</label>
          <Select
            name="tipo_integracao"
            id="tipo_integracao"
            options={tiposIntegracoes}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleTipoIntegracao}
          />
        </div>
        <div className="mb-3" id="opcoes">
        {loading ?
          <GLPI campos={campos} /> : ""
        }
        </div>
        </fieldset>
        <input
        className="btn btn-primary"
        type="submit" value="Cadastrar" />
      </form>
      { isRedirect ? <Redirect to={"/integracoes"} /> : ""}
    </div>
  );
}

export default IntegracoesCadastro;
