import sqlite3
import json
from flask import Flask, request
from flask_cors import CORS, cross_origin
from traceback import format_exc

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/", methods=["POST"])
@cross_origin()
def index():
	# if things go well
	try:
		# save data as json first
		# print data to show what it looks like
		to_insert = request.json
		to_insert = json.loads(to_insert)
		print(request.json)

		# connect to SQLite
		conn = sqlite3.connect('nyt-sudoku.db')
		cursor = conn.cursor()

		# insert into SQLite database
		cursor.execute("INSERT INTO doks_performance VALUES (?, ?, ?)",
				(to_insert['date'], str(to_insert['order']), str(to_insert['times'])))
		conn.commit()

		print('--------------------------------------------------\n\n')
		return "Successfully inserted into database"

	# if things go wrong
	except:
# 		print(format_exc())
# 		print('--------------------------------------------------\n\n')
		return format_exc()

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=8181, debug=True)
