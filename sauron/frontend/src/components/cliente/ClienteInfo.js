import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";

const ClienteInfo = () => {
  const [clienteInfo, setClienteInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { empresa_id } = useParams();

  const getClienteInfo = async () => {
    await axios.get("/api/cliente/info", {
      params: {
        empresa_id
      }
    })
    .then((response) => {
      setClienteInfo(response.data);
      setLoading(true);
    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    getClienteInfo();
  }, []);

  return (
    <div className="container">
    { loading ?
      <form action="#">
      <fieldset>
      <legend>Informações do cliente</legend>
        <div className="mb-3">
          <label htmlFor="empresa" className="form-label">Nome da empresa</label>
          <input
                type="text" id="empresa"
                name="empresa" className="form-control"
                readOnly="readonly"
                value={clienteInfo.empresa.empresa_nome} />
        </div>
        <div className="mb-3">
          <label htmlFor="empresa_id" className="form-label">Empresa ID</label>
          <input
                type="text" id="empresa_id"
                name="empresa_id" className="form-control"
                readOnly="readonly"
                value={clienteInfo.empresa.empresa_id} />
        </div>
        <div className="mb-3">
          <table className="table table-hover" style={{textAlign:"center"}}>
            <thead>
              <tr>
                <th colSpan="3" >Contatos disponíveis</th>
              </tr>
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefone</th>
              </tr>
            </thead>
            <tbody>
            {clienteInfo.contatos.map((contato) => (
              <tr key={contato.id}>
                <td>{contato.contato_nome}</td>
                <td>{contato.contato_email}</td>
                <td>{contato.contato_telefone}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </fieldset>
      </form>
      : ""
    }
    </div>
  );
}

export default ClienteInfo;
