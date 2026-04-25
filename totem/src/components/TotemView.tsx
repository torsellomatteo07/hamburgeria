import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Product, CartItem, OrderStatus } from '../types';
import { ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TotemView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: Math.random().toString(), productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (pid: string) => {
    setCart(prev => prev.filter(item => item.productId !== pid));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    setLastOrderNum(Math.floor(Math.random() * 100) + 1);
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 5000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center text-center p-4">
        <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
        <h1 className="text-4xl font-black mb-4">ORDINE INVIATO!</h1>
        <div className="bg-orange-600 text-white text-6xl font-black p-8 rounded-2xl">#{lastOrderNum}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8 grid grid-cols-2 gap-6">
        {MENU_ITEMS.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border">
            <img src={item.image} className="h-40 w-full object-cover rounded-2xl mb-4" />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{item.description}</p>
            <button onClick={() => addToCart(item)} className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold">+ Aggiungi</button>
          </div>
        ))}
      </div>
      <div className="w-96 bg-white border-l p-8 flex flex-col">
        <h2 className="text-2xl font-black mb-8 flex items-center gap-2"><ShoppingCart /> CARRELLO</h2>
        <div className="flex-1 overflow-auto space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between bg-gray-50 p-4 rounded-xl">
              <span>{item.quantity}x {item.name}</span>
              <button onClick={() => removeFromCart(item.productId)} className="text-red-500">Rimuovi</button>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t">
          <div className="flex justify-between text-2xl font-black mb-6"><span>TOTALE</span><span>€{total.toFixed(2)}</span></div>
          <button onClick={placeOrder} disabled={cart.length === 0} className="w-full bg-black text-white py-5 rounded-2xl font-bold">ORDINA ORA</button>
        </div>
      </div>
    </div>
  );
};

export default TotemView;
