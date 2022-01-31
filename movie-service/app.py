from flask import Flask

from db import db

app = Flask(__name__)


@app.route('/health')
def health():
    return 'ok'


@app.route('/api/movies')
def movies():
    return {'movies': db.get_movies()}


@app.route('/api/movies/<movie_id>')
def movies_by_id(movie_id):
    return {'movie': db.get_movie_by_id(int(movie_id))}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
