import json
import sys

from flask import Flask, request, send_file
from flask_restful import Api
from sqlalchemy.orm import Session
from sqlalchemy import select
from connection import get_azure_engine
from models import Feature, Account
from flask_cors import CORS, cross_origin
from algo_dev.build_cwcs import random_forest_regression_prediction
from compare_image import compare_floats_bar, compare_floats_pie

import values

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PROPAGATE_EXCEPTIONS'] = False

engine = get_azure_engine()
session = Session(engine)

#Returns all the communities & their data [GET]
#URL: http://127.0.0.1:5000/features/get-all
#Request format: None
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - None 
@app.route('/features/get-all', methods=['GET'])
@cross_origin()
def features():
   stmt = select(Feature)
   result = []
   for feature in session.scalars(stmt):
       result.append(feature.as_dict())

   return json.dumps(result), 200

#Returns the data of a community based on the serial number
#URL: http://127.0.0.1:5000/features/get-by-sno?sno=<serial_number>
#Request format: None 
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - serial number of community 
#Usage: /features/get-by-sno?sno=<serial_number>
@app.route('/features/get-by-sno', methods=['GET'])
@cross_origin()
def features_get_by_sno():
    serial_no = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_no])
    )
    result = []

    for feature in session.scalars(stmt):
        result.append(feature.as_dict())
    
    return json.dumps(result), 200

#Returns the communities within a population range
#URL: http://127.0.0.1:5000/features/get-by-population-range?min_pop=<min_population>&max_pop=<max_population>
#Request format: None 
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - minimum population, maximum population 
#Usage: /features/get-by-population-range?min_pop=<min_population>&max_pop=<max_population>
@app.route('/features/get-by-population-range', methods=['GET'])
@cross_origin()
def features_get_by_population_range():
    min_pop = request.args.get('min_pop')
    max_pop = request.args.get('max_pop')
    if max_pop and min_pop:
        stmt = select(Feature).where(
            Feature.population >= min_pop
        ).where(
            Feature.population <= max_pop
        )
    elif min_pop:
        stmt = select(Feature).where(
            Feature.population >= min_pop
        )
    else:
        stmt = select(Feature).where(
            Feature.population <= max_pop
        )
    result = []

    for feature in session.scalars(stmt):
        result.append(feature.as_dict())
    
    return result, 200

#Returns a bar graph comparing a community's stat with a state average stat
#URL: http://127.0.0.1:5000/features/get-bar-graph?sno=<serial_number>&field=<field>&bval=<b_value>
#Request format: None 
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - serial number, field, b_value
#Usage: /features/get-pie-chart?sno=<serial_number>&field=<field>&bval=<b_value>
@app.route('/features/get-bar-graph', methods=['GET'])
@cross_origin()
def features_get_bar_graph():
    serial_no = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_no])
    )
    result = []

    for feature in session.scalars(stmt):
        result.append(feature.as_dict())

    state_abbreviated = result[0]['stusps']
    state_name = values.state_abbreviations[state_abbreviated]

    field = request.args.get('field')
    b_val = request.args.get('bval')

    general_value = 0
    if field == 'gdp': 
        general_value = values.gdp_state[state_name]
    elif field == 'population': 
        general_value = values.population_state[state_name]
    
    compare_floats_bar(int(b_val), general_value, result[0]['name'], 'State Average', field, './images/' + result[0]['name'] + '_' + field)

    return send_file('./images/' + result[0]['name'] + '_' + field + '.png', mimetype='image/png'), 200

#Returns a pie chart comparing a community's stat with a state average stat
#URL: http://127.0.0.1:5000/features/get-pie-chart?sno=<serial_number>&field=<field>&bval=<b_value>
#Request format: None 
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - serial number, field, b_value
#Usage: /features/get-pie-chart?sno=<serial_number>&field=<field>&bval=<b_value>
@app.route('/features/get-pie-chart', methods=['GET'])
@cross_origin()
def features_get_pie_chart():
    serial_no = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_no])
    )
    result = []
    for feature in session.scalars(stmt):
        result.append(feature.as_dict())

    state_abbreviated = result[0]['stusps']
    state_name = values.state_abbreviations[state_abbreviated]

    field = request.args.get('field')
    b_val = request.args.get('bval')

    general_value = 0
    if field == 'gdp': 
        general_value = values.gdp_state[state_name]
    elif field == 'population': 
        general_value = values.population_state[state_name]
    
    compare_floats_pie(int(b_val), general_value, result[0]['name'], 'State Average', field, './images/' + result[0]['name'] + '_' + field)

    return send_file('./images/' + result[0]['name'] + '_' + field + '.png', mimetype='image/png'), 200

#Returns whether the region has successfully been added to the database
#URL: http://127.0.0.1:5000/features/create-region
#Request format: JSON
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - None 
@app.route('/features/create-region', methods=['POST'])
@cross_origin()
def features_create_region():
    data = request.get_json(force=True)
    if data['name'] == None or data['namelsad'] == None or data['stusps'] == None:
        return 'Must provide name, namelsad and stusps to add new region', 400
    
    new_region = Feature(data)
    feats = new_region.generate_cwcs_array_features()
    cwcs = random_forest_regression_prediction(feats)
    if cwcs:
        new_region.cwcs = cwcs[0]
    
    try:
        session.add(new_region)
        session.commit()
    except:
        session.rollback()
        raise

    return 'Success', 200
#Returns the region that has been deleted from the database
#URL: http://127.0.0.1:5000/features/delete?sno=<serial_number>
#Request format: None
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - serial number 
#Usage: /features/delete?sno=<serial_number>
@app.route('/features/delete', methods=['GET'])
@cross_origin()
def features_delete_region():
    serial_number = request.args.get('sno')
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_number])
    )
    result = []

    for feature in session.scalars(stmt):
        session.delete(feature)
    
    return result, 200

#Returns the region that has been updated in the database, must pass in the serial number in the JSON request 
#URL: http://127.0.0.1:5000/features/update
#Request format: JSON
#Response format: JSON
#No authentication 
#Rate limited: No 
#Parameters - None 
#Usage: /features/update
#Pass in a JSON of the data parameters you want to update
@app.route('/features/update', methods=['PUT'])
@cross_origin()
def features_update_region():
    data = request.get_json(force=True)
    serial_number = data['sno']
    stmt = select(Feature).where(
        Feature.serial_number.in_([serial_number])
    )
    for obj in session.scalars(stmt):
        feature = obj

    for key in data:
        setattr(feature, key, data[key])

    feats = feature.generate_cwcs_array_features()
    cwcs = random_forest_regression_prediction(feats)[0]
    setattr(feature, 'CWCS', cwcs)
    session.commit()

    return feature.as_dict(), 200

@app.route('/users/authenticate', methods=['POST'])
@cross_origin()
def authenticate():
    json_data = request.get_json(force=True)
    data = json.loads(json_data)
    if ('username' and 'password' and 'user_type' in data.keys()) is False:
        return 'Fill in all fields', 400
    
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
        return 400
    
    if account.password == password and account.user_type == user_type:
        return 200
    else:
        return 400
    
@app.route('/users/create-account', methods=['POST'])
@cross_origin()
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
        return 'Username already exists', 400
    new_account = Account(data)
    session.add(new_account)
    session.commit()
    return 200

@app.route('/users/change-password', methods=['PUT'])
@cross_origin()
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
    app.run(debug = True, port=5000)