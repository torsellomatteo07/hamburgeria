class DatabaseWrapper:
    def __init__(self):
        # Dati memorizzati in locale (niente DB esterno per ora)
        self.products = [
            {"id": 1, "name": "Classic Burger", "price": 8.5, "category": "panini"},
            {"id": 2, "name": "Coca Cola", "price": 2.5, "category": "bevande"},
            {"id": 3, "name": "Patatine", "price": 3.0, "category": "contorni"}
        ]
        self.orders = []

    def get_all_products(self):
        return self.products

    def add_product(self, data):
        new_id = len(self.products) + 1
        data['id'] = new_id
        self.products.append(data)
        return data

    def get_all_orders(self):
        return self.orders

    def create_order(self, data):
        new_order = {
            "id": len(self.orders) + 1,
            "items": data['items'],
            "status": "pending",
            "table": data.get('table', 0)
        }
        self.orders.append(new_order)
        return new_order

    def update_order_status(self, order_id, status):
        for o in self.orders:
            if o['id'] == order_id:
                o['status'] = status
                return o
        return None
