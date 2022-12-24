import React,{useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import Select from "react-select";
import axios from "axios";

const AlertasCadastro = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [taticas, setTaticas] = useState([]);
  const [tecnicas, setTecnicas] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let form = new FormData(evt.target);
    axios.post("/api/alerta_cadastro", form)
    .then((res) => {
      if (res.status === 200){
        setIsRedirect(true);
      } else {
        console.log("Erro: " + res.status);
      }
    })
  }

  const getTaticas = () => {
    axios.get("/api/mitre/taticas")
    .then((res) => {
      setTaticas(res.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  const getTecnicas = () => {
    axios.get("/api/mitre/tecnicas")
    .then((res) => {
      setTecnicas(res.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    getTaticas();
    getTecnicas();
  },[]);

  return(
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
        <legend>Cadastro de alerta</legend>
          <div className="mb-3">
            <label htmlFor="alerta" className="form-label">Nome do alerta</label>
            <input type="text" id="alerta" name="alerta" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="taticas" className="form-label">Taticas</label>
            <Select
              isMulti
              name="taticas"
              id="taticas"
              options={taticas}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tecnicas" className="form-label">Tecnicas</label>
            <Select
              isMulti
              name="tecnicas"
              id="tecnicas"
              options={tecnicas}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="criticidade" className="form-label">Criticidade</label>
            <Select
              name="criticidade"
              id="criticidade"
              options={[
                  {value:"baixo", label:"baixo"},
                  {value:"medio", label:"medio"},
                  {value:"alto", label:"alto"}
                ]
                }
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </fieldset>
        <input
        className="btn btn-primary"
        type="submit" value="Cadastrar" />
      </form>
      { isRedirect ? <Redirect to={"/alertas"} /> : ""}
    </div>
  );
}

export default AlertasCadastro;
