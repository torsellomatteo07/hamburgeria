from flask import Flask, jsonify, request
from database_wrapper import DatabaseWrapper
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Importante per permettere ad Angular e Flutter di comunicare col backend
db = DatabaseWrapper()

@app.route('/api/menu', methods=['GET'])
def get_menu():
    return jsonify(db.get_menu())

@app.route('/api/ordini', methods=['POST'])
def add_ordine():
    data = request.json
    db.create_order(data)
    return jsonify({"status": "success"}), 201

@app.route('/api/ordini', methods=['GET'])
def get_ordini():
    return jsonify(db.get_ordini())

if __name__ == '__main__':
    app.run(debug=True, port=5000)
