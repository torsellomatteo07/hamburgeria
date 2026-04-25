class DatabaseWrapper:
    def __init__(self):
        # Qui in futuro andrà la connessione a MySQL
        self.products = [
            {"id": 1, "nome": "Classic Burger", "prezzo": 8.50, "categoria": "panini"},
            {"id": 2, "nome": "Coca Cola", "prezzo": 2.50, "categoria": "bevande"}
        ]
        self.orders = []

    def get_menu(self):
        return self.products

    def create_order(self, order_data):
        self.orders.append(order_data)
        return True

    def get_orders(self):
        return self.orders
