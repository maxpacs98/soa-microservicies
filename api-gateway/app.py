import requests
from flask import Flask, request
from flask_cors import CORS

from apis import MOVIES_SERVICE_URL, NOTIFICATION_SERVICE_URL, CUSTOMER_SERVICE_URL, COMMENT_SERVICE_URL

app = Flask(__name__)
CORS(app)


@app.route('/api/movies')
def movies():
    movies_resp = requests.get(MOVIES_SERVICE_URL)
    return movies_resp.json()


# @app.route('/api/notify', methods=['POST'])
# def notify():
#     # TODO: Move this
#     notify_resp = requests.post(NOTIFICATION_SERVICE_URL, json=request.get_json())
#     return notify_resp.json()


@app.route('/api/customer/<email>')
def customer(email):
    customer_resp = requests.get(f'{CUSTOMER_SERVICE_URL}/{email}')
    return customer_resp.json()


@app.route('/api/customer/', methods=['POST'])
def add_customer():
    add_customer_resp = requests.post(CUSTOMER_SERVICE_URL, json=request.get_json())
    return add_customer_resp.json()


@app.route('/api/comment', methods=['POST'])
def add_comment():
    add_comment_resp = requests.post(COMMENT_SERVICE_URL, json=request.get_json())
    return add_comment_resp.json()


@app.route('/api/comments/movie/<movie_id>')
def comments_by_movie(movie_id):
    comments_by_movie_resp = requests.get(f'{COMMENT_SERVICE_URL}/movie/{movie_id}')
    return comments_by_movie_resp.json()


@app.route('/api/comments/customer/<customer_id>')
def comments_by_customer(customer_id):
    comments_by_customer_resp = requests.get(f'{COMMENT_SERVICE_URL}/customer/{customer_id}')
    return comments_by_customer_resp.json()


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
