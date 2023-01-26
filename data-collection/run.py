import requests, json, pandas as pd, sqlite3
from bs4 import BeautifulSoup
from traceback import format_exc
from sqlalchemy.types import Integer, String

web = requests.get("https://www.nytimes.com/puzzles/sudoku/easy")
soup = BeautifulSoup(web.text, 'html.parser')
data  = soup.find_all("script")[0].string
data = data[(data.index('= ')+2):]

# convert to json
df = json.loads(data)

# make connection to sqlite3
conn = sqlite3.connect('data-collection/nyt-sudoku.db')
cursor = conn.cursor()

# define table columns
tbl_cols = ['date', 'day_of_week', 'puzzle_id', 'hint', 'puzzle', 'solution']
tbl_schema = {
	"date": String(),
	"day_of_week": String(),
	"puzzle_id": Integer(),
	"hint": String(),
	"puzzle": String(),
	"solution": String()
}

# df_easy
try:
	# create temp dataframe from easy data
	easy_temp = pd.DataFrame([str(df['easy']['print_date']), str(df['easy']['day_of_week']), str(df['easy']['puzzle_id']), str(df['easy']['puzzle_data']['hints']), str(df['easy']['puzzle_data']['puzzle']), str(df['easy']['puzzle_data']['solution'])]).T
	# easy_temp.to_csv('~/Desktop/nyt-sudoku/data-collection/easy.csv', mode='a', header=False, index = False)
	easy_temp.columns = tbl_cols
	easy_temp.to_sql(name='doks_easy', con=conn, if_exists='append', index=False)

except:
	print(format_exc())


# df_medium
try:
	medium_temp = pd.DataFrame([str(df['medium']['print_date']), str(df['medium']['day_of_week']), str(df['medium']['puzzle_id']), str(df['medium']['puzzle_data']['hints']), str(df['medium']['puzzle_data']['puzzle']), str(df['medium']['puzzle_data']['solution'])]).T
	# medium_temp.to_csv('~/Desktop/nyt-sudoku/data-collection/medium.csv', mode='a', header=False, index = False)
	medium_temp.columns = tbl_cols
	medium_temp.to_sql(name='doks_medium', con=conn, if_exists='append', index=False)

except:
	print(format_exc())


# df_hard
try:
	hard_temp = pd.DataFrame([str(df['hard']['print_date']), str(df['hard']['day_of_week']), str(df['hard']['puzzle_id']), str(df['hard']['puzzle_data']['hints']), str(df['hard']['puzzle_data']['puzzle']), str(df['hard']['puzzle_data']['solution'])]).T
	# hard_temp.to_csv('~/Desktop/nyt-sudoku/data-collection/hard.csv', mode='a', header=False, index = False)
	hard_temp.columns = tbl_cols
	hard_temp.to_sql(name='doks_hard', con=conn, if_exists='append', index=False)

except:
	print(format_exc())
