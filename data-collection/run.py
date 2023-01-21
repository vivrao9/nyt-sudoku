import requests
import json
from bs4 import BeautifulSoup

web = requests.get("https://www.nytimes.com/puzzles/sudoku/easy")
soup = BeautifulSoup(web.text, 'html.parser')
data  = soup.find_all("script")[0].string
data = data[(data.index('= ')+2):]

df = json.loads(data)

import pandas as pd

df_easy = pd.read_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/easy.csv', header=0)
#C:\\Users\\Vivek Rao\\Desktop\\Programming\\Miscellaneous\\sudoku\\easy.csv', header = 0)
# df_easy
easy_temp = pd.DataFrame([df['easy']['print_date'],df['easy']['day_of_week'],df['easy']['puzzle_id'], df['easy']['puzzle_data']['hints'], df['easy']['puzzle_data']['puzzle'], df['easy']['puzzle_data']['solution']]).T
easy_temp.to_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/easy.csv', mode='a', header=False, index = False)

# df_medium = pd.read_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/medium.csv', header = 0)
# df_medium
medium_temp = pd.DataFrame([df['medium']['print_date'],df['medium']['day_of_week'],df['medium']['puzzle_id'], df['medium']['puzzle_data']['hints'], df['medium']['puzzle_data']['puzzle'], df['medium']['puzzle_data']['solution']]).T
medium_temp.to_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/medium.csv', mode='a', header=False, index = False)

# df_hard = pd.read_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/hard.csv', header = 0)
# df_hard
hard_temp = pd.DataFrame([df['hard']['print_date'],df['hard']['day_of_week'],df['hard']['puzzle_id'], df['hard']['puzzle_data']['hints'], df['hard']['puzzle_data']['puzzle'], df['hard']['puzzle_data']['solution']]).T
hard_temp.to_csv('/mnt/c/users/Vivek Rao/Desktop/Programming/Miscellaneous/sudoku/hard.csv', mode='a', header=False, index = False)
