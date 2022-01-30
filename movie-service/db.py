import json


class Database:
    def __init__(self):
        self.movies = self.read_initial_data()

    @staticmethod
    def read_initial_data():
        with open('data/movies.json') as json_file:
            data = json.load(json_file)
        return data

    def get_movies(self):
        return self.movies


db = Database()
