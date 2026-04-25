from flask import Flask, jsonify, request
from flask_cors import CORS
from database_wrapper import DatabaseWrapper

app = Flask(__name__)
CORS(app) # Permette a Flutter e Angular di comunicare con Flask
db = DatabaseWrapper()

@app.route('/api/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'GET':
        return jsonify(db.get_all_products())
    else:
        data = request.json
        return jsonify(db.add_product(data)), 201

@app.route('/api/orders', methods=['GET', 'POST'])
def manage_orders():
    if request.method == 'GET':
        return jsonify(db.get_all_orders())
    else:
        data = request.json
        return jsonify(db.create_order(data)), 201

@app.route('/api/orders/<int:order_id>', methods=['PATCH'])
def update_order(order_id):
    status = request.json.get('status')
    updated = db.update_order_status(order_id, status)
    if updated:
        return jsonify(updated)
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
