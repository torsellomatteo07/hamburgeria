from flask import Flask, jsonify, request
from flask_cors import CORS
from database_wrapper import DatabaseWrapper

app = Flask(__name__)
CORS(app) # Permette a Flutter/Angular di comunicare con Flask
db = DatabaseWrapper()

@app.route('/api/menu', methods=['GET'])
def get_menu():
    return jsonify(db.get_menu())

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    db.add_product(data)
    return jsonify({"status": "success"}), 201

@app.route('/api/orders', methods=['GET'])
def get_orders():
    return jsonify(db.get_orders())

@app.route('/api/orders', methods=['POST'])
def create_order():
    data = request.json
    order_id = db.create_order(data)
    return jsonify({"id": order_id}), 201

@app.route('/api/orders/<int:order_id>', methods=['PATCH'])
def update_status(order_id):
    data = request.json
    success = db.update_order_status(order_id, data.get('stato'))
    if success:
        return jsonify({"status": "updated"})
    return jsonify({"error": "not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
