import pandas as pd 
import numpy as np
import statsmodels.api as sm
import statsmodels.stats.api as sms
from statsmodels.stats.outliers_influence import OLSInfluence
from statsmodels.graphics.regressionplots import plot_leverage_resid2
from typing import Dict

import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
import math
import json

weightages = {}

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super(NpEncoder, self).default(obj)

def assign_weights(weightages: Dict) -> None:
    weightages["POPULATION"] = 0.3
    weightages["GDP"] = 0.1
    weightages["AVG_DEM_PCT"] = 0.15
    weightages["AVG_REP_PCT"] = 0.15
    weightages["DECLARATIONS"] = 0.1
    weightages["PA"] = 0.2

def get_dataset() -> pd.DataFrame:
    data = pd.read_csv("iParametrics_Data.csv")
    return data

def remove_NaN(data: pd.DataFrame) -> pd.DataFrame:
    data.HM = data.loc[:, "HM"].replace(to_replace = np.nan, value = 0)
    data.DECLARATIONS = data.loc[:, "DECLARATIONS"].replace(to_replace = np.nan, value = 0)
    data.AVG_REP_PCT = data.loc[:, "AVG_REP_PCT"].replace(to_replace = np.nan, value = 0)
    data.AVG_DEM_PCT = data.loc[:, "AVG_DEM_PCT"].replace(to_replace = np.nan, value = 0)
    data.PA = data.loc[:, "PA"].replace(to_replace = np.nan, value = 0)
    data.GDP = data.loc[:, "GDP"].replace(to_replace = np.nan, value = 0)
    data.POPULATION = data.loc[:, "POPULATION"].replace(to_replace = np.nan, value = 0)
    return data

def min_max_scaling(column):
    return (column - column.min()) / (column.max() - column.min())

def normalize_dataset(data: pd.DataFrame) -> pd.DataFrame:
    for feature_name in data.columns:
        if feature_name in weightages:
            data[feature_name] = min_max_scaling(data[feature_name])
    return data

def add_cols(data: pd.DataFrame) -> pd.DataFrame:
    this_arr = []
    for i in range(data.shape[0]): 
        curr_cwcs = 0
        for key in weightages:
            curr_cwcs += weightages[key] * data[key].iat[i]
        this_arr.append(curr_cwcs * 40)
    data['CWCS'] = this_arr
    return data

def write_json_file(data: pd.DataFrame) -> None:
    list_dicts = []
    for i in range(data.shape[0]):
        curr_row = data.iloc[i]
        curr_dict = {}
        curr_dict["REGION"] = curr_row["NAME"]
        curr_dict["COUNTY"] = curr_row["NAMELSAD"]    
        curr_dict["CWCS"] = curr_row["CWCS"]
        list_dicts.append(curr_dict)
    
    with open("cwcs.json", "w") as output_file:
        output_file.write(json.dumps(list_dicts, cls = NpEncoder))

def main():
    assign_weights(weightages)
    raw_data = get_dataset()
    cleaned_data = remove_NaN(raw_data)
    normalized_data = normalize_dataset(cleaned_data)
    final_DS = add_cols(normalized_data)
    write_json_file(final_DS)

if __name__ == "__main__":
    main()