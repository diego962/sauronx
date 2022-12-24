import React from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import Alertas from "./components/alerta/Alertas";
import AlertasCadastro from "./components/alerta/AlertasCadastro";
import AlertaInfo from "./components/alerta/AlertaInfo";
import Clientes from "./components/cliente/Clientes";
import ClienteInfo from "./components/cliente/ClienteInfo";
import ClienteCadastro from "./components/cliente/ClienteCadastro";
import IntegracaoInfo from "./components/integracao/IntegracaoInfo";
import Integracoes from "./components/integracao/Integracoes";
import IntegracoesCadastro from "./components/integracao/IntegracoesCadastro";
import Tarefas from "./components/tarefa/Tarefas";
import TarefasInfo from "./components/tarefa/TarefasInfo";
import TarefasCadastro from "./components/tarefa/TarefasCadastro";
import Playbooks from "./components/playbook/Playbooks";
import Tickets from "./components/ticket/Tickets";
import Templates from "./components/template/Templates";
import TemplatesCadastro from "./components/template/TemplatesCadastro";
import TemplateInfo from "./components/template/TemplateInfo";

import {BrowserRouter, Route, Switch} from "react-router-dom"

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path='/alertas'>
            <Alertas />
          </Route>
          <Route path='/alerta/info/:alerta_id'>
            <AlertaInfo />
          </Route>
          <Route path='/alerta_cadastro'>
            <AlertasCadastro />
          </Route>
          <Route path='/clientes'>
            <Clientes />
          </Route>
          <Route path='/cliente/info/:empresa_id'>
            <ClienteInfo />
          </Route>
          <Route path='/cliente_cadastro'>
            <ClienteCadastro />
          </Route>
          <Route path='/integracoes'>
            <Integracoes />
          </Route>
          <Route path='/integracao/info/:integracao_id'>
            <IntegracaoInfo />
          </Route>
          <Route path='/integracoes_cadastro'>
            <IntegracoesCadastro />
          </Route>
          <Route path='/tarefas'>
            <Tarefas />
          </Route>
          <Route path='/tarefa/info/:tarefa_id'>
            <TarefasInfo />
          </Route>
          <Route path='/tarefas_cadastro'>
            <TarefasCadastro />
          </Route>
          <Route path='/playbooks'>
            <Playbooks />
          </Route>
          <Route path='/tickets'>
            <Tickets />
          </Route>
          <Route path='/templates'>
            <Templates />
          </Route>
          <Route path='/templates_cadastro'>
            <TemplatesCadastro />
          </Route>
          <Route path='/template/info/:template_id'>
            <TemplateInfo />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
