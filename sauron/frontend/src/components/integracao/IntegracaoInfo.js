import React, {useState, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import axios from "axios";

const IntegracaoInfo = () => {
  const [integracaoInfo, setIntegracaoInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { integracao_id } = useParams();

  const getIntegracaoInfo = async () => {
    await axios.get("/api/integracao/info", {
      params: {
        integracao_id
      }
    })
    .then((response) => {
      console.log(response.data)
      setIntegracaoInfo(response.data);
      setLoading(true);

    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    getIntegracaoInfo();
  }, []);

  return (
    <div className="container">
    { loading ?
      <form action="#">
      <fieldset>
      <legend>Informações da integracao</legend>
      <div className="mb-3">
        <label htmlFor="integracao_nome" className="form-label">Nome da integracao</label>
        <input
              type="text" id="integracao_nome"
              name="integracao_nome" className="form-control"
              readOnly="readonly"
              value={integracaoInfo.integracao.integracao_nome} />
      </div>


      {integracaoInfo.integracao.integracao_campos.split(",").map((item) => (
        <>
        <div className="mb-3">
          <label
              htmlFor={item.split(":")[0]}
              className="form-label">{item.split(":")[0]}</label>
          <input
              type="text" id={item.split(":")[0]}
              name={item.split(":")[0]} className="form-control"
              readOnly="readonly"
              value={item.split(":")[1]} />
        </div>
        </>
      ))}
      </fieldset>
      </form>
      :
        <div className="mb-3 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        </div>
    }
    </div>
  );
}

export default IntegracaoInfo;
