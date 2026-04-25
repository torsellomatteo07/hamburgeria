const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Database in memoria
let orders = [];
let menu = [
  { id: 1, name: "Classic Burger", price: 8.50, category: "panini", description: "Manzo, cheddar, lattuga" },
  { id: 2, name: "Chicken Sandwich", price: 9.00, category: "panini", description: "Pollo frito, maionese" },
  { id: 3, name: "Coca Cola", price: 2.50, category: "bevande", description: "33cl" },
  { id: 4, name: "Patatine", price: 3.50, category: "contorni", description: "Porzione media" }
];

// Rotta per il Menù
app.get('/api/menu', (req, res) => res.json(menu));

// Rotta per gli Ordini
app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const newOrder = { 
    id: Date.now(), 
    items: req.body.items, 
    total: req.body.total,
    table: req.body.table,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Update stato ordine
app.patch('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  orders = orders.map(o => o.id == id ? { ...o, status } : o);
  res.json({ success: true });
});

app.listen(PORT, () => console.log('Backend Hamburgeria pronto sulla porta ' + PORT));
