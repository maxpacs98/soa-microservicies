from flask import Flask, request

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/comments/movie/<movie_id>')
def comments_by_movie(movie_id):
    return {'comments': db.get_comments_for_movie(int(movie_id))}


@app.route('/api/comments/customer/<customer_id>')
def comments_by_customer(customer_id):
    return {'comments': db.get_comments_for_user_id(int(customer_id))}


@app.route('/api/comments', methods=['POST'])
def add_comment():
    request_data = request.get_json()
    added_id = db.add_comment(**request_data)
    return {'id': added_id, **request_data}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5004)
