import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Product, CartItem } from '../types';
import { ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TotemView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [complete, setComplete] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.productId === p.id);
      if (ex) return prev.map(i => i.productId === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: Math.random().toString(), productId: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-black mb-8">HAMBURGERIA <span className="text-orange-600">DIGITAL</span></h1>
        <div className="grid grid-cols-2 gap-6">
          {MENU_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border">
              <img src={item.image} className="h-40 w-full object-cover rounded-xl mb-4" />
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">€{item.price.toFixed(2)}</p>
              <button onClick={() => addToCart(item)} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">+ AGGIUNGI</button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-80 bg-white border-l p-6">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2"><ShoppingCart /> CARRELLO</h2>
        <div className="space-y-4 mb-8">
          {cart.map(i => (<div key={i.id} className="flex justify-between"><span>{i.quantity}x {i.name}</span><span>€{(i.price * i.quantity).toFixed(2)}</span></div>))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between text-2xl font-black mb-6"><span>TOTALE</span><span>€{total.toFixed(2)}</span></div>
          <button className="w-full bg-black text-white py-4 rounded-xl font-black">ORDINA ORA</button>
        </div>
      </div>
    </div>
  );
};
export default TotemView;
