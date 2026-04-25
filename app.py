from flask import Flask, jsonify, request
from flask_cors import CORS
from database_wrapper import DatabaseWrapper

app = Flask(__name__)
CORS(app) # Permette ai frontend (Flutter/Angular) di chiamare le API
db = DatabaseWrapper()

@app.route('/api/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'POST':
        return jsonify(db.add_product(request.json)), 201
    return jsonify(db.get_products())

@app.route('/api/orders', methods=['GET', 'POST'])
def manage_orders():
    if request.method == 'POST':
        return jsonify(db.create_order(request.json)), 201
    return jsonify(db.get_orders())

@app.route('/api/orders/<int:order_id>', methods=['PATCH'])
def update_order(order_id):
    status = request.json.get('status')
    order = db.update_order_status(order_id, status)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
