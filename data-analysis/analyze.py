# import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import timedelta

# read in and format CSV appropriately
df = pd.read_csv('Desktop/Programming/Miscellaneous/sudoku/1822.csv', header=0, parse_dates=['date'])
df = df.iloc[:,:2]
def seconder(x):
    try:
        mins, secs = map(float, x.split(':'))
        td = timedelta(minutes=mins, seconds=secs, milliseconds=0)
        return td.total_seconds()
    
    except:
        pass
df["Vivek's time"] = df["Vivek's time"].apply(seconder)
df.columns = ['date', 'time']

nyt = pd.read_csv('Desktop/Programming/Miscellaneous/sudoku/easy.csv', header=0, parse_dates=['date'])
nyt = nyt.drop_duplicates()
# nyt.date
solve = pd.merge(df, nyt, how='inner')

solve.puzzle = solve.puzzle.apply(lambda x: np.matrix(x).reshape(9,9))
solve.puzzle = solve.puzzle.apply(lambda x: np.where(x > 0, 1, 0))

from sklearn.linear_model import LinearRegression

lm = LinearRegression()
lm.fit(solve['puzzle'], solve['time'])

np.matrix(solve.puzzle[0])