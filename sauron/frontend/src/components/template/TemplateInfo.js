import React, {useState, useEffect} from "react";
import {Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import axios from "axios";

const TemplateInfo = () => {
  const [templateInfo, setTemplateInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { template_id } = useParams();

  const getTemplateInfo = async () => {
    await axios.get("/api/template/info", {
      params: {
        template_id
      }
    })
    .then((response) => {
      setTemplateInfo(response.data);
      setLoading(true);

    })
    .catch((erro) => {
      console.log(erro)
    })
  }

  useEffect(() => {
    getTemplateInfo();
  }, []);

  return (
    <div className="container">
    { loading ?
      <form action="#">
      <fieldset>
      <legend>Informações do Template</legend>
      <div className="mb-3">
        <label htmlFor="template" className="form-label">Nome do template</label>
        <input
              type="text" id="template"
              name="template" className="form-control"
              readOnly="readonly"
              value={templateInfo.template.template_nome} />
      </div>
      <div className="mb-3">
        <label
          htmlFor="template_msg"
          className="form-label">Messagem do alerta</label>
        <textarea
          id="template_msg"
          name="template_msg"
          className="form-control"
          readOnly="readonly">
            {templateInfo.template.template_message}
          </textarea>
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

export default TemplateInfo;
