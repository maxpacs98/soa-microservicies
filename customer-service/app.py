from flask import Flask, request

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/customer/<email>')
def customer(email):
    return {'customer': db.get_customer_by_email(email)}


@app.route('/api/customer/', methods=['POST'])
def add_customer():
    request_data = request.get_json()
    added_id = db.add_customer(**request_data)
    return {'id': added_id, **request_data}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5003)
