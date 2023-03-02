import pandas as pd 
import numpy as np
from scipy import stats

import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
import math
import json

def get_dataset() -> pd.DataFrame:
    data = pd.read_csv("./dataset/dataset_final.csv", encoding='latin-1')
    return data

def append_target_feature(dataset: pd.DataFrame) -> pd.DataFrame:
    dataset = dataset.dropna(subset=['HM', 'PA'])
    dataset = dataset[dataset['PA'] != 0]
    hm_arr = dataset.loc[:, 'HM']
    pa_arr = dataset.loc[:, 'PA']
    dataset = dataset.assign(target = hm_arr / pa_arr)
    return dataset

def assign_cwcs(dataset: pd.DataFrame) -> pd.DataFrame:
    arr = np.array(dataset['target'].tolist())
    arr = np.vectorize(lambda x: stats.percentileofscore(arr, x))(arr)
    arr = arr / 10
    arr = np.around(arr, decimals = 1)
    
    dataset.drop(columns=['target'], inplace=True)
    dataset['cwcs'] = arr

    return dataset


def main():
    dataset = get_dataset()
    dataset = append_target_feature(dataset)
    assign_cwcs(dataset)

if __name__ == "__main__":
    main()