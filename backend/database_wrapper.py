class DatabaseWrapper:
    def __init__(self):
        # Dati di esempio (Mock data)
        self.products = [
            {"id": 1, "nome": "Classic Burger", "prezzo": 8.50, "categoria": "panini"},
            {"id": 2, "nome": "Chicken Burger", "prezzo": 9.00, "categoria": "panini"},
            {"id": 3, "nome": "Coca Cola", "prezzo": 2.50, "categoria": "bevande"},
            {"id": 4, "nome": "Patatine", "prezzo": 3.50, "categoria": "contorni"}
        ]
        self.orders = []

    def get_menu(self):
        return self.products

    def add_product(self, product):
        product['id'] = len(self.products) + 1
        self.products.append(product)
        return True

    def get_orders(self):
        return self.orders

    def create_order(self, order_data):
        order_data['id'] = len(self.orders) + 1
        order_data['stato'] = 'pendenza'
        self.orders.append(order_data)
        return order_data['id']

    def update_order_status(self, order_id, new_status):
        for order in self.orders:
            if order['id'] == order_id:
                order['stato'] = new_status
                return True
        return False
