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

@app.route('/features/create-region', methods=['POST'])
def features_create_region():
    json_data = request.get_json(force=True)
    data = json.loads(json_data)
    if ('name' and 'namelsad' and 'stusps' in data.keys()) is False:
        return {'Message': 'Must provide name, namelsad and stusps to add new region', 
                'Code': 400}
    
    new_region = Feature(data)
    session.add(new_region)
    session.commit()

    return {'Code': 200}


@app.route('/features/delete', methods=['GET'])
def features_delete_region():
    serial_number = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_number])
    )
    result = []

    for feature in session.scalars(stmt):
        session.delete(feature)
    
    return result, 200

@app.route('/features/update', methods=['PUT'])
def features_update_region():
    data = request.get_json(force=True)
    data = json.loads(data)
    serial_number = data['sno']
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_number])
    )
    for obj in session.scalars(stmt):
        feature = obj

    for key in data:
        setattr(feature, key, data[key])
    session.commit()

    return feature.as_dict(), 200

@app.route('/users/authenticate', methods=['POST'])
def authenticate():
    json_data = request.get_json(force=True)
    data = json.loads(json_data)
    if ('username' and 'password' and 'user_type' in data.keys()) is False:
        return {'Message': 'Fill in all fields', 
                'Code': 400}
    
    username = data['username']
    password = data['password']
    user_type = data['user_type']

    stmt = select(Account).where(
        (Account.username.in_([username]))
    )

    account = None

    for obj in session.scalars(stmt):
        account = obj

    if account is None:
        return {'Code': '400'}
    
    if account.password == password and account.user_type == user_type:
        return {'Code': '200'}
    else:
        return {'Code': '400'}
    
@app.route('/users/create-account', methods=['POST'])
def users_create_account():
    json_data = request.get_json(force=True)
    data = json.loads(json_data)
    if ('username' and 'password' and 'user_type' in data.keys()) is False:
        return {'Message': 'Must provide name, password and user type to add new region', 
                'Code': 400}
    stmt = select(Account).where(
        (Account.username.in_([data['username']]))
    )

    result = []

    for account in session.scalars(stmt):
        result.append(account.as_dict())

    if result:
        return {
            'Message': 'Username already exists',
            'Code': '400'
        }

    new_account = Account(data)
    session.add(new_account)
    session.commit()

    return {'Code': 200}

@app.route('/users/change-password', methods=['PUT'])
def users_change_password():
    data = request.get_json(force=True)
    data = json.loads(data)
    username = data['username']
    stmt = select(Account).where(
        Account.username.in_([username])
    )

    for obj in session.scalars(stmt):
        account = obj

    setattr(account, 'password', data['password'])
    session.commit()

    return account.as_dict(), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)