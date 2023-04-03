import pandas as pd 
import numpy as np
import os
from scipy import stats
import matplotlib.pyplot as plt

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn import metrics
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestRegressor


COLUMNS = ['GDP', 'TAXES', 'POPULATION', 'EM_EMPLOYMENT', 'HIGH_COMB_HAZ_RES', 'HIGH_COMB_HAZ_COM', 'COLLEGE_UNIV',
               'NRI', 'AVG_DEM_PCT', 'HIGHER_ED', 'AVG_REP_PCT', 'VOTER_TURN', 'BROADBAND']

def build_dataset():
    cd = os.getcwd()
    print(cd)
    cd += ('/algo_dev/ml_model.csv')
    dataset = pd.read_csv(cd, encoding='latin-1', index_col=0)
    dataset.replace(np.nan, 0, inplace=True)
    dataset.drop(columns=['HVRI_SOVI', 'POP_CHANGE', 'HM_PLAN_TYPE','HM_PLAN_STATUS', 'URBAN_RURAL'], inplace=True)
    X= dataset[COLUMNS] 
    Y= dataset[['CWCS']]  
    return X, Y

def process_input(X_input):
    df = pd.DataFrame(X_input, COLUMNS)
    return df 

def logistic_regression_prediction(X_input):
    X, Y = build_dataset()
    logreg = LogisticRegression(max_iter = 10000)
    logreg.fit(X, Y)
    X_processed_input = process_input(X_input)
    Y_pred = logreg.predict(X_processed_input)
    return Y_pred

def svc_prediction(X_input):
    X, Y = build_dataset()
    model_svc = SVC()
    model_svc.fit(X, Y)
    X_processed_input = process_input(X_input)
    Y_pred = model_svc.predict(X_processed_input)
    return Y_pred
