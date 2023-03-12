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


def assign_cwcs(dataset: pd.DataFrame) -> pd.DataFrame:
    arr = np.array(dataset['target'].tolist())
    arr = np.vectorize(lambda x: stats.percentileofscore(arr, x))(arr)
    arr = arr / 10
    arr = np.around(arr, decimals = 0)


    dataset.drop(columns=['target'], inplace=True)
    dataset['CWCS'] = arr


    return dataset


def split_dataset(dataset: pd.DataFrame):
    dataset.replace(np.nan, 0, inplace=True)
    dataset.drop(inplace=True, columns=['STATEFP', 'COUNTYFP', 'GEOID', 'STUSPS', 'HM_PLAN_TYPE', 'HM_PLAN_STATUS', 
                                        'URBAN_RURAL', 'NAME', 'NAMELSAD', 'HM', 'PA'])
    X_train, X_test, y_train, y_test = train_test_split(dataset.drop(columns=["CWCS"]), dataset['CWCS'], test_size=0.9, random_state=42)
    svm = SVC(kernel='linear')
    svm.fit(X_train, y_train)
    predictions = svm.predict(X_test)


    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)
    return X_train, X_test, y_train, y_test


def main():
    dataset = get_dataset()
    dataset['HM'] = dataset['HM'].replace(np.nan, 0)
    dataset['PA'] = dataset['PA'].replace(np.nan, 0)
    dataset.drop_duplicates(inplace=True)
    dataset.to_csv(path_or_buf='/Users/pranavthomas/Desktop/cleaned_data.csv')


if __name__ == "__main__":
    main()
