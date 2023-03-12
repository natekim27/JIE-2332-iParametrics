import textwrap
import pyodbc
import json
import datetime
import ast
import requests


from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from sqlalchemy.orm import Session
from sqlalchemy import select
from connection import get_azure_engine
from models import Feature, Account


app = Flask(__name__)
api = Api(app)


engine = get_azure_engine()
session = Session(engine)

@app.route('/features/get-all', methods=['GET'])
def features():
   stmt = select(Feature)
   result = []
   for feature in session.scalars(stmt):
       result.append(feature.as_dict())


   return result, 200

@app.route('/features/get-by-sno', methods=['GET'])
def features_get_by_sno():
    serial_no = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_no])
    )
    result = []

    for feature in session.scalars(stmt):
        result.append(feature.as_dict())
    
    return result, 200