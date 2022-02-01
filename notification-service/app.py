import logging

from flask import Flask, request

from template import email_template

app = Flask(__name__)

logger = logging.getLogger(__name__)


@app.route('/api/notify/', methods=["POST"])
def notify():
    request_data = request.get_json()
    print(f'Sending email to: {request_data["email"]}')
    print(email_template % f'localhost:4200/movies/{request_data["movie_id"]}')
    return {'status': 'sent'}


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5002)
