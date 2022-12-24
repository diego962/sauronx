from flask import render_template, url_for, request, jsonify
from sauron.ext.database import db
from sauron.blueprints.web.models import Empresa, Contato, Alerta
from sauron.blueprints.web.models import Tarefa, TiposIntegracoes, Integracao
from sauron.blueprints.web.models import VariaveisTemplate, Template
from pyattck import Attck

import json

def clientes():
    empresas = Empresa.query.order_by(Empresa.empresa_nome).all()
    empresas_lista = []

    for empresa in empresas:
        empresas_lista.append(empresa.as_dict())

    return json.dumps(empresas_lista)

def alertas():
    alertas = Alerta.query.order_by(Alerta.alerta_nome).all()
    alertas_lista = []

    for alerta in alertas:
        alertas_lista.append(alerta.as_dict())

    return json.dumps(alertas_lista)

def integracoes():
    integracoes = Integracao.query.order_by(Integracao.integracao_nome).all()
    integracao_lista = []

    for integracao in integracoes:
        integracao_lista.append(integracao.as_dict())

    return json.dumps(integracao_lista)

def tarefas():
    tarefas = Tarefa.query.order_by(Tarefa.tarefa_nome).all()
    tarefas_lista = []

    for tarefa in tarefas:
        tarefas_lista.append(tarefa.as_dict())

    return json.dumps(tarefas_lista)


def cliente_cadastro():
    if request.method == "POST":
        form = request.form
        qtd_contatos = int(form['qtd_contatos'])
        nome_empresa = form['empresa']
        empresa_id = form['empresa_id']

        empresa = Empresa(nome_empresa, empresa_id)

        db.session.add(empresa)

        for i in range(0, qtd_contatos):
            chave = f"contato{i+1}"
            contato_nome = form[chave]
            contato_email = form['email-%s' % chave]
            contato_telefone = form['telefone-%s' % chave]

            contato = Contato(
                              empresa_id,
                              contato_nome,
                              contato_email,
                              contato_telefone
                             )
            db.session.add(contato)

        db.session.commit()
        res = jsonify(success=True)
        return res

def cliente_info():
    empresa_id  = request.args.get('empresa_id')
    if empresa_id:
        contatos = Contato.query.filter_by(empresa_id=empresa_id).all()
        empresa = Empresa.query.filter_by(empresa_id=empresa_id).first()

        contatos_lista = []

        for contato in contatos:
            contatos_lista.append(contato.as_dict())

        cl_info = {
            "empresa": empresa.as_dict(),
            "contatos": contatos_lista
        }

        return json.dumps(cl_info)

def alerta_info():
    alerta_id  = request.args.get('alerta_id')
    taticas = {}
    tecnicas = {}

    if alerta_id:
        alerta = Alerta.query.filter_by(id=alerta_id).first()

        for tatica in alerta.taticas.split(","):
            print(tatica.split(";"))
            id, nome, wiki = tatica.split(";")
            taticas[id] = {"name": nome, "wiki": wiki}

        for tecnica in alerta.tecnicas.split(","):
            id, nome, wiki = tecnica.split(";")
            tecnicas[id] = {"name": nome, "wiki": wiki}


        al_info = {
            "alerta": alerta.as_dict(),
            "taticas": taticas,
            "tecnicas": tecnicas
        }

        return json.dumps(al_info)


def integracao_info():
    integracao_id  = request.args.get('integracao_id')

    if integracao_id:
        integracao = Integracao.query.filter_by(integracao_id=integracao_id).first()


        int_info = {
            "integracao": integracao.as_dict()
        }

        return json.dumps(int_info)

def tarefa_info():
    tarefa_id  = request.args.get('tarefa_id')

    if tarefa_id:
        tarefa = Tarefa.query.filter_by(tarefa_id=tarefa_id).first()
        clientes = []
        alertas = []
        templates = []
        cortex = False

        for empresa in tarefa.tarefas_empresas:
            clientes.append(empresa.empresa_nome)

        for alerta in tarefa.tarefas_alertas:
            alertas.append(alerta.alerta_nome)

        for template in tarefa.tarefas_template:
            templates.append(template.template_nome)

        if tarefa.cortex_lista != "":
            cortex = True

        taf_info = {
            "tarefa": tarefa.as_dict(),
            "clientes":",".join(clientes),
            "alertas":",".join(alertas),
            "templates":",".join(templates),
            "cortex": cortex,
            "cortex_lista": tarefa.cortex_lista.split(",")
        }

        return json.dumps(taf_info)

def mitre_taticas():
    attack = Attck()
    data = []

    for tactic in attack.enterprise.tactics:
        tactic_json = {
            "value": tactic.id + ";" + tactic.name + ";" + tactic.wiki,
            "label": tactic.name
        }
        data.append(tactic_json)

    return json.dumps(data)

def mitre_tecnicas():
    attack = Attck()
    data = []

    for technique in attack.enterprise.techniques:
        techniques_json = {
            "value": technique.id + ";" + technique.name + ";" + technique.wiki,
            "label": technique.name
        }
        data.append(techniques_json)
    return json.dumps(data)

def tipos_integracoes():
    int_nome  = request.args.get('integracao_nome')
    integracao = TiposIntegracoes.query.filter_by(tipo_integracao_nome=int_nome).first()
    data = []

    for campo in integracao.tipo_integracao_campos.split(","):
        data.append(campo)

    return json.dumps(data)

def integracoes_cadastro():
    if request.method == "POST":
        data = []
        form = request.form
        int_nome = form['tipo_integracao']
        integracao = TiposIntegracoes.query.filter_by(tipo_integracao_nome=int_nome).first()

        for campo in integracao.tipo_integracao_campos.split(","):
            data.append(campo + ":" + form[campo])

        db.session.add(Integracao(int_nome, ",".join(data)))
        db.session.commit()

        return jsonify(success=True)

def alerta_cadastro():
    if request.method == "POST":
        form = request.form
        alerta_nome = form["alerta"]
        taticas = form.getlist("taticas")
        tecnicas = form.getlist("tecnicas")
        criticidade = form["criticidade"]

        alerta = Alerta(
                        alerta_nome,
                        ",".join(taticas),
                        ",".join(tecnicas),
                        criticidade
                       )

        db.session.add(alerta)
        db.session.commit()

        return jsonify(success=True)

def tarefa_cadastro():
    if request.method == "POST":
        form = request.form
        tarefa_nome = form["tarefa"]
        clientes = form.getlist("clientes")
        alertas = form.getlist("alertas")
        templates = form.getlist("templates")

        abertura_ticket = "false"
        cortex_lista = ""
        integracao_nome = ""



        if form["abertura_ticket"] == "sim":
            abertura_ticket = "true"
            integracao_nome = form["integracao"]

        try:
            if form["cortex"] == "sim":
                cortex_lista = form.getlist("cortex_consultas")
                cortex_lista = ",".join(cortex_lista)
        except KeyError as err:
            print(err)

        tarefa = Tarefa(tarefa_nome, abertura_ticket, cortex_lista, integracao_nome)


        for cliente_id in clientes:
            empresa = Empresa.query.filter_by(empresa_id=cliente_id).first()
            tarefa.tarefas_empresas.append(empresa)

        for alerta_id in alertas:
            alerta = Alerta.query.filter_by(id=alerta_id).first()
            tarefa.tarefas_alertas.append(alerta)

        for template_id in templates:
            template = Template.query.filter_by(template_id=template_id).first()
            tarefa.tarefas_template.append(template)

        db.session.add(tarefa)
        db.session.commit()

        return jsonify(success=True)

def lista_variaveis_template():
    data = []
    if request.method == "GET":
        variaveis_template = VariaveisTemplate.query.all()

        for variavel_template in variaveis_template:
            dict_variavel_template = {
                "nome":variavel_template.variaveis_template_siem_nome,
                "variaveis":variavel_template.variaveis_template_chaves.split(",")
            }

            data.append(dict_variavel_template)
        return json.dumps(data)

def templates():
    if request.method == "GET":
        templates = Template.query.order_by(Template.template_nome).all()
        templates_lista = []

        for template in templates:
            templates_lista.append(template.as_dict())

        return json.dumps(templates_lista)

def template_cadastro():
    if request.method == "POST":
        form = request.form
        template_nome = form["template_nome"]
        template_message = form["template_msg"]

        template = Template(template_nome, template_message)
        db.session.add(template)
        db.session.commit()

        return jsonify(success=True)

def template_info():
    template_id  = request.args.get('template_id')

    if template_id:
        template = Template.query.filter_by(template_id=template_id).first()

        template_info = {
            "template": template.as_dict(),
        }

        return json.dumps(template_info)
