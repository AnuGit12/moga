#!/usr/bin/env python

import os
from flask import Flask, render_template
from flask import request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import ast
import json

db = SQLAlchemy()
app = Flask(__name__)
db.init_app(app)
CORS(app)




POSTGRES = {
    'user': 'moga_user',
    'pw': 'password',
    'db': 'mogadb',
    'host': 'localhost',
    'port': '5432',
}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES


class MogaSavedState(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state_name = db.Column(db.String)
    table_data = db.Column(db.String)
    slider_data = db.Column(db.Integer)
    input_data = db.Column(db.Integer)
    output_data = db.Column(db.Integer)
    constraints_data = db.Column(db.Integer)
    dropdown1 = db.Column(db.String)
    dropdown2 = db.Column(db.String)




@app.route("/")
def index():
    return render_template('index.html')


@app.route("/table-data-save", methods = ['GET', 'POST'])
def saveTableData():
    table_data = request.data
    return "Hello World!"

@app.route("/save-slider", methods = ['GET', 'POST'])
def saveSliderData():
    slider_data = request.data
    return "Hello World!"

@app.route("/save-other-data", methods = ['GET', 'POST'])
def saveOtherData():
    data = request.data
    # state_name = ast.literal_eval(data)
    dic = json.loads(data)
    state_name = dic['state_name']
    input_data = dic['input']
    output_data = dic['output']
    const_data = dic['constraint']
    dropdown_1 = dic['dropdown']['1']
    dropdown_2 = dic['dropdown']['2']

    

    
    return "Hello World!"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)



#open postgresql terminal
#psql postgres


#create database
#create database mogadb;

# list all the databses
# \l


#create user
#create user moga_user with encrypted password 'password';


#grant permission on databse to user
#grant all privileges on database mogadb to moga_user;