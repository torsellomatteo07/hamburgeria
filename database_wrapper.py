class DatabaseWrapper:
    def __init__(self):
        # Dati iniziali di prova
        self.products = [
            {"id": 1, "name": "Classic Burger", "price": 8.5, "category": "panini", "description": "Manzo, cheddar, lattuga"},
            {"id": 2, "name": "Chicken Spicy", "price": 9.0, "category": "panini", "description": "Pollo frito, salsa piccante"},
            {"id": 3, "name": "Coca Cola", "price": 2.5, "category": "bevande", "description": "33cl"},
            {"id": 4, "name": "Patatine Fritte", "price": 3.5, "category": "contorni", "description": "Porzione media"}
        ]
        self.orders = []

    def get_products(self):
        return self.products

    def add_product(self, product):
        product['id'] = len(self.products) + 1
        self.products.append(product)
        return product

    def get_orders(self):
        return self.orders

    def create_order(self, order_data):
        order = {
            "id": len(self.orders) + 1,
            "items": order_data.get('items', []),
            "total": order_data.get('total', 0),
            "status": "pending",
            "table": order_data.get('table', 0)
        }
        self.orders.append(order)
        return order

    def update_order_status(self, order_id, status):
        for order in self.orders:
            if order['id'] == order_id:
                order['status'] = status
                return order
        return None
