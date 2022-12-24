from flask import Blueprint

from .views import *

web = Blueprint("web", __name__, template_folder="templates", static_folder="static", static_url_path="/")

web.add_url_rule(
    '/api/clientes', view_func=clientes, methods=["GET"]
)
web.add_url_rule(
    '/api/alertas', view_func=alertas, methods=["GET"]
)
web.add_url_rule(
    '/api/integracoes', view_func=integracoes, methods=["GET"]
)
web.add_url_rule(
    '/api/tarefas', view_func=tarefas, methods=["GET"]
)
web.add_url_rule(
    '/api/cliente_cadastro', view_func=cliente_cadastro, methods=["POST"]
)
web.add_url_rule(
    '/api/cliente/info', view_func=cliente_info, methods=["GET"]
)
web.add_url_rule(
    '/api/alerta/info', view_func=alerta_info, methods=["GET"]
)
web.add_url_rule(
    '/api/template/info', view_func=template_info, methods=["GET"]
)
web.add_url_rule(
    '/api/integracao/info', view_func=integracao_info, methods=["GET"]
)
web.add_url_rule(
    '/api/tarefa/info', view_func=tarefa_info, methods=["GET"]
)
web.add_url_rule(
    '/api/mitre/taticas', view_func=mitre_taticas, methods=["GET"]
)
web.add_url_rule(
    '/api/mitre/tecnicas', view_func=mitre_tecnicas, methods=["GET"]
)
web.add_url_rule(
    '/api/alerta_cadastro', view_func=alerta_cadastro, methods=["POST"]
)
web.add_url_rule(
    '/api/tarefa_cadastro', view_func=tarefa_cadastro, methods=["POST"]
)
web.add_url_rule(
    '/api/tipos_integracoes', view_func=tipos_integracoes, methods=["GET"]
)
web.add_url_rule(
    '/api/integracoes_cadastro', view_func=integracoes_cadastro, methods=["POST"]
)
web.add_url_rule(
    '/api/lista_variaveis_template', view_func=lista_variaveis_template, methods=["GET"]
)
web.add_url_rule(
    '/api/templates', view_func=templates, methods=["GET"]
)
web.add_url_rule(
    '/api/template_cadastro', view_func=template_cadastro, methods=["POST"]
)

def init_app(app):
    app.register_blueprint(web)
