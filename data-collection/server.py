from flask import Flask, request
#from flask_cors import CORS
from flask_csp.csp import csp_header

app = Flask(__name__)
# CORS(app)
@csp_header({'default-src':"'none'",'script-src':"'self'", 'connect-src': "*"})

@app.route('/', methods=['POST'])

def post():
	print(request.data) # initially request.data
	return ''

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8090)
