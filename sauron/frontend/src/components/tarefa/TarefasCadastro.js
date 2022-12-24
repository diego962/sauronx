import React,{useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const TarefasCadastro = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [cortex, setCortex] = useState(false);
  const [ticket, setTicket] = useState(false);

  const cortex_consultas = [
    "abuseipdb",
    "virustotal",
    "misp"
  ];

  const integracoes = [
    "glpi"
  ]

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let form = new FormData(evt.target);

    axios.post("/api/tarefa_cadastro", form)
    .then((res) => {
      if (res.status === 200){
        setIsRedirect(true);
      } else {
        console.log("Erro: " + res.status);
      }
    })
  }

  const handleCortex = (evt) => {
    setCortex(evt.target.checked);
  }

  const handleTicket = (evt) => {
    setTicket(evt.target.checked);
  }

  const getClientes = async () => {
    await axios.get("/api/clientes")
    .then((response) => {
      setClientes(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  const getAlertas = async () => {
    await axios.get("/api/alertas")
    .then((response) => {
      setAlertas(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  const getTemplates = async () => {
    await axios.get("/api/templates")
    .then((response) => {
      console.log(response.data);
      setTemplates(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  const formataClientesLista = (dados) => {
    let clientes_lista = [];

    dados.forEach((empresa) => {
      clientes_lista.push({
        "value": empresa.empresa_id,
        "label": empresa.empresa_nome
      })
    })
    return clientes_lista;
  }

  const formataAlertasLista = (dados) => {
    let alertas_lista = [];

    dados.forEach((alerta) => {
      alertas_lista.push({
        "value": alerta.id,
        "label": alerta.alerta_nome
      })
    })
    return alertas_lista;
  }

  const formataTemplatesLista = (dados) => {
    let templates_lista = [];

    dados.forEach((template) => {
      templates_lista.push({
        "value": template.template_id,
        "label": template.template_nome
      })
    })
    return templates_lista;
  }

  useEffect(() => {
    getClientes();
    getAlertas();
    getTemplates();
  },[]);

  return(
    <div className="container">
      <form onSubmit={handleSubmit}>
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
               name="tarefa" />
            </div>
            <div className="mb-3">
              <label htmlFor="clientes" className="form-label">Cliente</label>
              <Select
                isMulti
                id="clientes"
                name="clientes"
                options={formataClientesLista(clientes)}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="alertas" className="form-label">Alertas</label>
              <Select
                isMulti
                id="alertas"
                name="alertas"
                options={formataAlertasLista(alertas)}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="templates" className="form-label">Template</label>
              <Select
                isMulti
                id="templates"
                name="templates"
                options={formataTemplatesLista(templates)}
                className="basic-multi-select"
                classNamePrefix="select"
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
                 value="sim"
                 name="abertura_ticket"
                 onChange={handleTicket}/>
              </div>
              {ticket ? integracoes.map((elemento) => (
                <div className="opt form-check form-switch">
                  <label htmlFor={elemento} className="form-check-label">{elemento}</label>
                  <input
                   key={elemento}
                   type="checkbox"
                   className="form-check-input"
                   id={elemento}
                   value={elemento}
                   name="integracao"/>
                </div>
              )):"" }
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label htmlFor="cortex" className="form-check-label">Cortex</label>
                <input
                 type="checkbox"
                 className="form-check-input"
                 id="cortex"
                 name="cortex"
                 value="sim"
                 onChange={handleCortex} />
              </div>
              {cortex ? cortex_consultas.map((elemento) => (
                <div className="opt form-check form-switch">
                  <label htmlFor={elemento} className="form-check-label">{elemento}</label>
                  <input
                   key={elemento}
                   type="checkbox"
                   className="form-check-input"
                   id={elemento}
                   value={elemento}
                   name="cortex_consultas"/>
                </div>
              )):"" }
            </div>
          </div>
        </div>
        </fieldset>
        <input
        className="btn btn-primary"
        type="submit" value="Cadastrar" />
      </form>
      { isRedirect ? <Redirect to={"/tarefas"} /> : ""}
    </div>
  );
}

export default TarefasCadastro;
