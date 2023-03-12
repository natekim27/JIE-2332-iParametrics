import pandas as pd 
import numpy as np
from scipy import stats


import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score




import math
import json




def get_dataset() -> pd.DataFrame:
    data = pd.read_csv("./dataset/dataset_final.csv", encoding='latin-1', index_col=0)
    return data


def append_target_feature(dataset: pd.DataFrame) -> pd.DataFrame:
    dataset = dataset.dropna(subset=['HM', 'PA'])
    dataset = dataset[dataset['PA'] != 0]
    hm_arr = dataset.loc[:, 'HM']
    pa_arr = dataset.loc[:, 'PA']
    dataset = dataset.assign(target = hm_arr / pa_arr)
    return dataset
