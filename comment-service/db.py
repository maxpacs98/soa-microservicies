import json


class Database:
    def __init__(self):
        self.comments = self.read_initial_data()
        self.next_id = 3

    @staticmethod
    def read_initial_data():
        with open('data/comments.json') as json_file:
            data = json.load(json_file)
        return data

    def get_comments_for_movie(self, movie_id):
        comments = []
        for c in self.comments:
            if c['movie_id'] == movie_id:
                comments.append(c)
        return comments

    def get_comments_for_user_id(self, user_id):
        comments = []
        for c in self.comments:
            if c['customer_id'] == user_id:
                comments.append(c)
        return comments

    def add_comment(self, customer_id, movie_id, text, commented_at):
        self.comments.append({'id': self.next_id,
                              'customer_id': int(customer_id),
                              'movie_id': int(movie_id),
                              'text': text,
                              'commented_at': commented_at})
        self.next_id = self.next_id + 1
        return self.next_id - 1


db = Database()
