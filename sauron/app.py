from flask import Flask
from sauron.ext import configuration
from sauron.ext import database
from sauron.ext import commands
from sauron.ext.database import db
from sauron.blueprints import web

app = Flask(__name__)
configuration.init_app(app)
database.init_app(app)
web.init_app(app)
commands.init_app(app)
