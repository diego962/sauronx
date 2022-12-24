import React, {useState, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import axios from "axios";

const AlertaInfo = () => {
  const [tarefaInfo, setTarefaInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { tarefa_id } = useParams();

  const getTarefaInfo = async () => {
    await axios.get("/api/tarefa/info", {
      params: {
        tarefa_id
      }
    })
    .then((response) => {
      console.log(response.data)
      setTarefaInfo(response.data);
      setLoading(true);
    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    getTarefaInfo();
  }, []);

  return (
    <div className="container">
    { loading ?
      <form>
        <fieldset>
        <legend>Cadastro de Tarefas</legend>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="tarefa" className="form-label">Nome da tarefa</label>
              <input
               type="text"
               className="form-control"
               id="tarefa"
               value={tarefaInfo.tarefa.tarefa_nome}
               readOnly="readonly"
               name="tarefa" />
            </div>
            <div className="mb-3">
              <label htmlFor="clientes" className="form-label">Cliente</label>
              <input
                id="clientes"
                name="clientes"
                value={tarefaInfo.clientes}
                className="form-control"
                readOnly="readonly"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="alertas" className="form-label">Alertas</label>
              <input
                id="alertas"
                name="alertas"
                value={tarefaInfo.alertas}
                className="form-control"
                readOnly="readonly"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="templates" className="form-label">Templates</label>
              <input
                id="templates"
                name="templates"
                value={tarefaInfo.templates}
                className="form-control"
                readOnly="readonly"
              />
            </div>
          </div>
          <div className="switch-tarefas col">
            <div className="mb-3">
              <div className="form-check form-switch">
                <label htmlFor="abertura_ticket" className="form-check-label">Abrir ticket</label>
                <input
                 type="checkbox"
                 className="form-check-input"
                 id="abertura_ticket"
                 checked={tarefaInfo.tarefa.abrir_ticker ? true : false}
                 value="sim"
                 readOnly="readonly"
                 name="abertura_ticket" />
              </div>
              {tarefaInfo.tarefa.abrir_ticker ?
                <div className="opt form-check form-switch">
                  <label
                    htmlFor={tarefaInfo.tarefa.tarefa_integracao_nome}
                    className="form-check-label">
                    {tarefaInfo.tarefa.tarefa_integracao_nome}
                  </label>
                  <input
                   type="checkbox"
                   key={tarefaInfo.tarefa.tarefa_integracao_nome}
                   className="form-check-input"
                   id={tarefaInfo.tarefa.tarefa_integracao_nome}
                   readOnly="readonly"
                   checked={true}
                   value={tarefaInfo.tarefa.tarefa_integracao_nome}
                   name="integracao"/>
                </div>
              :"" }
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label htmlFor="cortex" className="form-check-label">Cortex</label>
                <input
                 type="checkbox"
                 className="form-check-input"
                 id="cortex"
                 checked={tarefaInfo.cortex}
                 name="cortex"
                 readOnly="readonly"
                 value="sim"/>
              </div>
              {tarefaInfo.cortex ? tarefaInfo.cortex_lista.map((elemento) => (
                <div className="opt form-check form-switch">
                  <label htmlFor={elemento} className="form-check-label">{elemento}</label>
                  <input
                   key={elemento}
                   type="checkbox"
                   className="form-check-input"
                   id={elemento}
                   readOnly="readonly"
                   checked={true}
                   value={elemento}
                   name="cortex_consultas"/>
                </div>
              )):"" }
            </div>
          </div>
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
