import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {BsPlus} from "react-icons/bs";
import {IconContext} from "react-icons";
import axios from "axios";
import "../../assets/css/main.css";

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  const getTemplates = async () => {
    await axios.get("/api/templates")
    .then((response) => {
      setTemplates(response.data);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  useEffect(() => {
    getTemplates();
  },[]);

  return (
    <>
    <div className="container">
      <Link className="navbar-brand" to="/templates_cadastro">
        <IconContext.Provider value={{className: 'adicionar'}}>
          <BsPlus />
        </IconContext.Provider>
      </Link>
    </div>

    <div className="container">
      <div className="row">
      <div className="col-8">
      <div className="list-group">
        {templates.map((template) => (
          <Link
            key={template.id}
            className="list-group-item list-group-item-action"
            to={`/template/info/${template.template_id}`}>
            {template.template_nome}
            </Link>
        ))}
      </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default Templates;
