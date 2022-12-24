import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

const ClienteCadastro = () => {
  const [qtdContatos, setQtdContatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const handleQtdContados = (evt) => {
    evt.preventDefault();
    let qtd = parseInt(evt.target.value);
    let qtd_arr = [...Array(qtd).keys()];
    setQtdContatos(qtd_arr);
    setLoading(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let form = new FormData(evt.target);
    axios.post("/api/cliente_cadastro", form)
    .then((res) => {
      if (res.status === 200){
        setIsRedirect(true);
      } else {
        console.log("Erro: " + res.status);
      }
    })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
        <legend>Cadastro de cliente</legend>
          <div className="mb-3">
            <label htmlFor="empresa" className="form-label">Nome da empresa</label>
            <input type="text" id="empresa" name="empresa" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="empresa_id" className="form-label">Empresa ID</label>
            <input type="text" id="empresa_id" name="empresa_id" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="qtd_contatos">Quantidade de contatos: </label>
            <select className="form-select" id="qtd_contatos" name="qtd_contatos" onChange={handleQtdContados}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-3" id="contatos">
          {loading ?
            qtdContatos.map((item) => (
              <>
                <label htmlFor="contato" className="form-label">
                {(item + 1).toString() + "° Contato"}
                </label>
                <input
                 id={"contato" + (item+1).toString()}
                 type="text"
                 name={"contato" + (item+1).toString()}
                 placeholder="Nome contato"
                 className="form-control"/>
                 <input
                  id={"email-contato" + (item+1).toString()}
                  type="email"
                  name={"email-contato" + (item+1).toString()}
                  placeholder="Email contato"
                  className="form-control"/>
                  <input
                   id={"telefone-contato" + (item+1).toString()}
                   type="tel"
                   name={"telefone-contato" + (item+1).toString()}
                   placeholder="Telefone contato"
                   className="form-control"/>
              </>
            )) : ""
          }
          </div>
        </fieldset>
        <input
        className="btn btn-primary"
        type="submit" value="Cadastrar" />
      </form>
      { isRedirect ? <Redirect to={"/clientes"} /> : ""}
    </div>
  );
}

export default ClienteCadastro;
