import json


class Database:
    def __init__(self):
        self.customers = self.read_initial_data()
        self.next_id = 3

    @staticmethod
    def read_initial_data():
        with open('data/customers.json') as json_file:
            data = json.load(json_file)
        return data

    def get_customer_by_email(self, email):
        customer = None
        for c in self.customers:
            if c['email'] == email:
                customer = c
        return customer

    def get_customer_by_id(self, id):
        customer = None
        for c in self.customers:
            if c['id'] == id:
                customer = c
        return customer

    def add_customer(self, email, display_name):
        self.customers.append({'id': self.next_id, 'email': email, 'display_name': display_name})
        self.next_id = self.next_id + 1
        return self.next_id - 1


db = Database()
