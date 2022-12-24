from sauron.ext.database import db

class Empresa(db.Model):
    __tablename__ = 'empresa'
    id = db.Column(db.Integer, primary_key=True)
    empresa_nome = db.Column(db.String(150), nullable=False, unique=True)
    empresa_id = db.Column(db.String(30), nullable=False, unique=True)

    def __init__(self, empresa_nome, empresa_id):
        self.empresa_nome = empresa_nome
        self.empresa_id = empresa_id

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Contato(db.Model):
    __tablename__ = 'contato'
    id = db.Column(db.Integer, primary_key=True)
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    contato_nome = db.Column(db.String(150), nullable=False)
    contato_email = db.Column(db.String(150), nullable=False)
    contato_telefone = db.Column(db.String(150), nullable=False)

    def __init__(self,
                 empresa_id,
                 contato_nome,
                 contato_email,
                 contato_telefone
                 ):
        self.empresa_id = empresa_id
        self.contato_nome = contato_nome
        self.contato_email = contato_email
        self.contato_telefone = contato_telefone

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Alerta(db.Model):
    __tablename__ = 'alerta'
    id = db.Column(db.Integer, primary_key=True)
    alerta_nome = db.Column(db.String(150), nullable=False)
    taticas = db.Column(db.String(150), nullable=False)
    tecnicas = db.Column(db.String(150), nullable=False)
    criticidade = db.Column(db.String(150), nullable=False)

    def __init__(self,
                 alerta_nome,
                 taticas,
                 tecnicas,
                 criticidade
                ):
        self.alerta_nome = alerta_nome
        self.taticas = taticas
        self.tecnicas = tecnicas
        self.criticidade = criticidade

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


tarefas_alertas = db.Table("tarefas_alertas",
    db.Column('tarefa_id',
              db.Integer,
              db.ForeignKey('tarefa.tarefa_id'),
              primary_key=True
             ),
    db.Column('alerta_id',
              db.Integer,
              db.ForeignKey('alerta.id'),
              primary_key=True
             )
)

tarefas_empresas = db.Table("tarefas_empresas",
    db.Column('tarefa_id',
              db.Integer,
              db.ForeignKey('tarefa.tarefa_id'),
              primary_key=True
              ),
    db.Column('empresa_id',
              db.Integer,
              db.ForeignKey('empresa.empresa_id'),
              primary_key=True
              )
)

tarefas_template = db.Table("tarefas_template",
    db.Column('tarefa_id',
              db.Integer,
              db.ForeignKey('tarefa.tarefa_id'),
              primary_key=True
             ),
    db.Column('template_id',
              db.Integer,
              db.ForeignKey('template.template_id'),
              primary_key=True
             )
)

class Tarefa(db.Model):
    __tablename__ = 'tarefa'
    tarefa_id = db.Column(db.Integer, primary_key=True)
    tarefa_nome = db.Column(db.String(150), nullable=False)
    tarefa_integracao_nome = db.Column(db.String(150), nullable=False)
    abrir_ticker = db.Column(db.String(5), default="false")
    cortex_lista = db.Column(db.String(150), nullable=False)
    tarefas_empresas = db.relationship(
        'Empresa',
        secondary=tarefas_empresas,
        lazy='subquery',
        backref=db.backref('tarefas', lazy=True)
    )
    tarefas_alertas = db.relationship(
        'Alerta',
        secondary=tarefas_alertas,
        lazy='subquery',
        backref=db.backref('tarefas', lazy=True)
    )
    tarefas_template = db.relationship(
        'Template',
        secondary=tarefas_template,
        lazy='subquery',
        backref=db.backref('tarefas', lazy=True)
    )

    def __init__(self,
                 tarefa_nome,
                 abrir_ticker,
                 cortex_lista,
                 integracao_nome
                ):
        self.tarefa_nome = tarefa_nome
        self.abrir_ticker = abrir_ticker
        self.cortex_lista = cortex_lista
        self.tarefa_integracao_nome = integracao_nome

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class TiposIntegracoes(db.Model):
    __tablename__ = 'tipos_integracoes'
    tipo_integracao_id = db.Column(db.Integer, primary_key=True)
    tipo_integracao_nome = db.Column(db.String(150), nullable=False, unique=True)
    tipo_integracao_campos = db.Column(db.String(200), nullable=False)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Integracao(db.Model):
    __tablename__ = 'integracoes'
    integracao_id = db.Column(db.Integer, primary_key=True)
    integracao_nome = db.Column(db.String(150), nullable=False, unique=True)
    integracao_campos = db.Column(db.String(1000), nullable=False)

    def __init__(self,
                 integracao_nome,
                 integracao_campos,
                ):
                self.integracao_nome = integracao_nome
                self.integracao_campos = integracao_campos

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class VariaveisTemplate(db.Model):
    __tablename__ = 'variaveis_template'
    variaveis_template_id = db.Column(db.Integer, primary_key=True)
    variaveis_template_siem_nome = db.Column(
                                                db.String(100),
                                                nullable=False,
                                                unique=True
                                            )
    variaveis_template_chaves = db.Column(
                                                db.String(1000),
                                                nullable=False
                                         )

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Template(db.Model):
    __tablename__ = 'template'
    template_id = db.Column(db.Integer, primary_key=True)
    template_nome = db.Column(db.String(100), nullable=False, unique=True)
    template_message = db.Column(db.String(1000), nullable=False)

    def __init__(self, template_nome, template_message):
        self.template_nome = template_nome
        self.template_message = template_message

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
