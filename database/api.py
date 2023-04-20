import json

from flask import Flask, request, send_file
from flask_restful import Api
from sqlalchemy import select
from database.models.account import Account
from database.models.features import Feature
from flask_cors import CORS, cross_origin
from ml.build_cwcs import random_forest_regression_prediction
from compare_image import compare_floats_bar, compare_floats_pie
from database.resources import db

import values

app = Flask(__name__)
api = Api(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['PROPAGATE_EXCEPTIONS'] = False

#Returns all the communities & their data [GET]
#URL: http://127.0.0.1:5000/features/get-all
@app.route('/features/get-all', methods=['GET'])
@cross_origin()
def get_all():
   features = db.get_all_features()
   return json.dumps(features), 200

#Returns the data of a community based on the serial number
#URL: http://127.0.0.1:5000/features/get-by-sno?sno=<sno>
@app.route('/features/get-by-sno', methods=['GET'])
@cross_origin()
def features_get_by_sno():
    serial_no = request.args.get('sno')
    feature = db.get_feature_by_sno(serial_no).as_dict()
    return json.dumps(feature), 200

#Returns the communities within a population range
#URL: http://127.0.0.1:5000/features/get-by-population-range?min_pop=<min_population>&max_pop=<max_population>
@app.route('/features/get-by-population-range', methods=['GET'])
@cross_origin()
def features_get_by_population_range():
    min_pop = request.args.get('min_pop')
    max_pop = request.args.get('max_pop')
    features = db.get_features_by_population_range(min_pop, max_pop)
    return features, 200

#Returns a bar graph comparing a community's stat with a state average stat
#URL: http://127.0.0.1:5000/features/get-bar-graph?sno=<sno>&field=<field>&bval=<b_value>
@app.route('/features/get-bar-graph', methods=['GET'])
@cross_origin()
def features_get_bar_graph():
    serial_no = request.args.get('sno')
    feature = db.get_feature_by_sno(serial_no).as_dict()
    state_abbreviated = feature[0]['stusps']
    state_name = values.state_abbreviations[state_abbreviated]
    field = request.args.get('field')
    b_val = request.args.get('bval')
    is_national = request.args.get('national')

    general_value = 0
    if field == 'gdp':  
        general_value = values.gdp_state_county[state_name]
        if is_national == 'true': general_value = values.gdp_national
    elif field == 'population': 
        general_value = values.population_state_county[state_name]
        if is_national == 'true': general_value = values.population_average_county
    elif field == 'nri': 
        general_value = values.national_risk_index_state[state_name]
    elif field == 'taxes': 
        general_value = values.tax_state_county[state_name]
        if is_national == 'true': general_value = values.tax_national
    elif field == 'college_univ': 
        general_value = values.colleges_state_county[state_name]
        if is_national == 'true': general_value = values.college_national
    elif field == 'declarations': 
        general_value = values.disaster_declarations_state_county[state_name]
        if is_national == 'true': general_value = values.disaster_declarations_national
    elif field == 'pa': 
        general_value = values.public_obligation_state_avg
    elif field == 'hm': 
        general_value = values.hazard_obligation_national
    
    average_marker = 'State' 
    if is_national == 'true': average_marker = 'National'
    compare_floats_bar(round(float(b_val)), general_value, feature[0]['name'], average_marker + ' Average', field, './images/' + feature[0]['name'] + '_' + field)

    return send_file('./images/' + feature[0]['name'] + '_' + field + '.png', mimetype='image/png'), 200

#Returns a pie chart comparing a community's stat with a state average stat
#URL: http://127.0.0.1:5000/features/get-pie-chart?sno=<sno>&field=<field>&bval=<b_value>
@app.route('/features/get-pie-chart', methods=['GET'])
@cross_origin()
def features_get_pie_chart():
    serial_no = request.args.get('sno')
    feature = db.get_feature_by_sno(serial_no).as_dict()
    state_abbreviated = feature[0]['stusps']
    state_name = values.state_abbreviations[state_abbreviated]

    field = request.args.get('field')
    b_val = request.args.get('bval')
    is_national = request.args.get('national')

    general_value = 0
    if field == 'gdp':  
        general_value = values.gdp_state_county[state_name]
        if is_national == 'true': general_value = values.gdp_national
    elif field == 'population': 
        general_value = values.population_state_county[state_name]
        if is_national == 'true': general_value = values.population_average_county
    elif field == 'nri': 
        general_value = values.national_risk_index_state[state_name]
    elif field == 'taxes': 
        general_value = values.tax_state_county[state_name]
        if is_national == 'true': general_value = values.tax_national
    elif field == 'college_univ': 
        general_value = values.colleges_state_county[state_name]
        if is_national == 'true': general_value = values.college_national
    elif field == 'declarations': 
        general_value = values.disaster_declarations_state_county[state_name]
    elif field == 'pa': 
        general_value = values.public_obligation_state_avg
    elif field == 'hm': 
        general_value = values.hazard_obligation_national
    
    average_marker = 'State' 
    if is_national == 'true': average_marker = 'National'
    compare_floats_pie(round(float(b_val)), general_value, feature[0]['name'], average_marker + ' Average', field, './images/' + feature[0]['name'] + '_' + field)

    return send_file('./images/' + feature[0]['name'] + '_' + field + '.png', mimetype='image/png'), 200

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
    db.add_feature(new_region)

    return 'Success', 200

#Returns the region that has been deleted from the database
#URL: http://127.0.0.1:5000/features/delete?sno=<sno>
@app.route('/features/delete', methods=['GET'])
@cross_origin()
def features_delete_region():
    serial_no = request.args.get('sno')
    db.delete_feature_by_sno(serial_no)
    return 'Success', 200

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
    serial_no = data['sno']
    feature = db.get_feature_by_sno(serial_no)

    for key in data:
        setattr(feature, key, data[key])

    feats = feature.generate_cwcs_array_features()
    cwcs = random_forest_regression_prediction(feats)[0]
    setattr(feature, 'CWCS', cwcs)
    db.session_commit()
    return feature.as_dict(), 200

@app.route('/users/authenticate', methods=['POST'])
@cross_origin()
def authenticate():
    data = request.get_json(force=True)
    if data['username'] == None or data['password'] == None or data['user_type'] == None:
        return 'Fill in all fields', 400
    if data['username'] == "" or data['password'] == "":
        return 'Fill in correct username and password', 400
    
    username = data['username']
    password = data['password']
    user_type = data['user_type']
    account = db.get_account_by_username(username)

    if account is None:
        return 'Account not found', 400
    
    if account.password == password and account.user_type == user_type:
        return 'Success', 200
    else:
        return 'Invalid Credentials', 400
    
@app.route('/users/create-account', methods=['POST'])
@cross_origin()
def users_create_account():
    data = request.get_json(force=True)
    if data['username'] == None or data['password'] == None or data['user_type'] == None:
        return 'Fill in all fields', 400
    if data['username'] == "" or data['password'] == "":
        return 'Fill in correct username and password', 400
    
    account = db.get_account_by_username(data['username'])

    if account:
        return 'Username already exists', 400
    else:
        db.add_account(data['username'], data['password'], data['user_type'])
    
    return 'Success', 200

@app.route('/users/change-password', methods=['PUT'])
@cross_origin()
def users_change_password():
    data = request.get_json(force=True)
    data = json.loads(data)
    username = data['username']
    password = data['password']
    account = db.update_account_password(username, password)
    return account.as_dict(), 200

if __name__ == '__main__':
    app.run(debug = True, port=5000)