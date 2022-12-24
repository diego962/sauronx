import React, {useState, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import axios from "axios";

const AlertaInfo = () => {
  const [alertaInfo, setAlertaInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { alerta_id } = useParams();

  const getAlertaInfo = async () => {
    await axios.get("/api/alerta/info", {
      params: {
        alerta_id
      }
    })
    .then((response) => {
      console.log(response.data)
      setAlertaInfo(response.data);
      setLoading(true);

    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    getAlertaInfo();
  }, []);

  return (
    <div className="container">
    { loading ?
      <form action="#">
      <fieldset>
      <legend>Informações do Alerta</legend>
      <div className="mb-3">
        <label htmlFor="alerta" className="form-label">Nome do alerta</label>
        <input
              type="text" id="alerta"
              name="alerta" className="form-control"
              readOnly="readonly"
              value={alertaInfo.alerta.alerta_nome} />
      </div>
      <div className="mb-3">
      <label className="form-label">Taticas Mitre Attack associadas</label>
      {alertaInfo.alerta.taticas.split(",").map((item) => (
        <>
          <div className="row">
            <div className="col">
              <input
              readOnly="readonly"
              type="text"
              className="form-control"
              value={item.split(";")[0]} />
            </div>
            <div className="col">
              <input
              readOnly="readonly"
              type="text"
              className="form-control"
              value={alertaInfo.taticas[item.split(";")[0]].name} />
            </div>
            <div className="col">
              <a
              href={alertaInfo.taticas[item.split(";")[0]].wiki}
              className="btn btn-primary active"
              target="_blank" rel="noreferrer">
              {alertaInfo.taticas[item.split(";")[0]].wiki}
              </a>
            </div>
          </div>
          <br/>
        </>
      ))}
      <label className="form-label">Tecnicas Mitre Attack associadas</label>
      {alertaInfo.alerta.tecnicas.split(",").map((item) => (
        <>
          <div className="row">
            <div className="col">
              <input
              readOnly="readonly"
              type="text"
              className="form-control"
              value={item.split(";")[0]} />
            </div>
            <div className="col">
              <input
              readOnly="readonly"
              type="text"
              className="form-control"
              value={alertaInfo.tecnicas[item.split(";")[0]].name} />
            </div>
            <div className="col">
              <a
              href={alertaInfo.tecnicas[item.split(";")[0]].wiki}
              className="btn btn-primary active"
              target="_blank" rel="noreferrer">
              {alertaInfo.tecnicas[item.split(";")[0]].wiki}
              </a>
            </div>
          </div>
          <br/>
        </>
      ))}
      </div>
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

export default AlertaInfo;
