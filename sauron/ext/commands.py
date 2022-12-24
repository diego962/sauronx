from sauron.ext.database import db

def createdb():
    db.create_all()

def init_app(app):
    app.cli.add_command(app.cli.command()(createdb))
