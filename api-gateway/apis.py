import os

if not os.environ.get('IS_DOCKER'):
    movie_host = notification_host = customer_host = comment_host = '127.0.0.1'
else:
    movie_host = 'movie-service'
    notification_host = 'notification-service'
    customer_host = 'customer-service'
    comment_host = 'comment-service'

MOVIES_SERVICE_URL = f'http://{movie_host}:5001/api/movies'
NOTIFICATION_SERVICE_URL = f'http://{notification_host}:5002/api/notify'
CUSTOMER_SERVICE_URL = f'http://{customer_host}:5003/api/customer'
COMMENT_SERVICE_URL = f'http://{comment_host}:5004/api/comments'
