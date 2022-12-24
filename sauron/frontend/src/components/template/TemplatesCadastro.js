import React,{useState, useEffect} from "react";
import {Redirect} from "react-router-dom";
import {BsQuestionSquare} from "react-icons/bs";
import {IconContext} from "react-icons";
import { Popover, PopoverBody } from 'reactstrap';
import Select from "react-select";
import axios from "axios";

import "../../assets/css/main.css";

const TemplatesCadastro = () => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [variaveisTemplate,setVariaveisTemplate] = useState([]);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const getVariaveisTemplate = () => {
    axios.get("/api/lista_variaveis_template")
    .then((res) => {
      setVariaveisTemplate(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const form = new FormData(evt.target);
    axios.post("/api/template_cadastro", form)
    .then((res) => {
      if (res.status === 200){
        setIsRedirect(true);
      } else {
        console.log("Erro: " + res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getVariaveisTemplate();
  },[])

  return(
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
        <legend>Cadastro de template</legend>
          <div className="mb-3">
            <label htmlFor="template_nome" className="form-label">Nome do template</label>
            <input type="text" id="template_nome" name="template_nome" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="template_msg" className="form-label">Messagem do alerta</label>
            <IconContext.Provider value={{className: 'ajuda'}}>
              <BsQuestionSquare id="ajuda"/>
            </IconContext.Provider>
            <Popover placement="top" isOpen={popoverOpen} target="ajuda" toggle={toggle}>
              <PopoverBody>
                <ul className="list-group overflow-auto lista-variaveis optList">
                  {variaveisTemplate ?
                    variaveisTemplate.map((item) => (
                      <>
                        <li id="item-nome" className="list-group-item">{item.nome}</li>
                        <ul className="list-group optList">
                          {item.variaveis.map((variavel) => (
                            <li className="list-group-item">{variavel}</li>
                          ))}
                        </ul>
                      </>
                    ))
                    :""}
                </ul>
              </PopoverBody>
            </Popover>
            <textarea id="template_msg" name="template_msg" className="form-control"></textarea>
          </div>
        </fieldset>
        <input
        className="btn btn-primary"
        type="submit" value="Cadastrar" />
      </form>
      { isRedirect ? <Redirect to={"/templates"} /> : ""}
    </div>
  );
}

export default TemplatesCadastro;
