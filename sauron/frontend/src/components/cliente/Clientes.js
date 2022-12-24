import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {BsPlus} from "react-icons/bs";
import {IconContext} from "react-icons";
import axios from "axios";
import "../../assets/css/main.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const getClientes = async () => {
    await axios.get("/api/clientes")
    .then((response) => {
      setClientes(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    getClientes();
  },[]);

  return (
    <>
    <div className="container">
      <Link className="navbar-brand" to="/cliente_cadastro">
        <IconContext.Provider value={{className: 'adicionar'}}>
          <BsPlus />
        </IconContext.Provider>
      </Link>
    </div>

    <div className="container">
      <div className="row">
      <div className="col-8">
      <div className="list-group">
        {clientes.map((empresa) => (
          <Link
            key={empresa.empresa_id}
            className="list-group-item list-group-item-action"
            to={`/cliente/info/${empresa.empresa_id}`}>
            {empresa.empresa_nome}
          </Link>
        ))}
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default Clientes;
