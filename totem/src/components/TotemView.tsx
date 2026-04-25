import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Product, CartItem } from '../types';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

const TotemView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.productId === p.id);
      if (ex) return prev.map(i => i.productId === p.id ? {...i, quantity: i.quantity + 1} : i);
      return [...prev, { id: Math.random().toString(), productId: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-black mb-8 italic">HAMBURGERIA <span className="text-orange-600">DIGITALE</span></h1>
        <div className="grid grid-cols-2 gap-6">
          {MENU_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-black text-lg">€{item.price.toFixed(2)}</span>
                <button onClick={() => addToCart(item)} className="bg-orange-600 text-white p-3 rounded-2xl"><Plus size={20}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-80 bg-white border-l p-6">
        <h2 className="text-2xl font-black mb-6">IL TUO ORDINE</h2>
        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-4 bg-gray-50 p-3 rounded-xl">
            <span className="font-bold">{item.quantity}x {item.name}</span>
            <span>€{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <button className="w-full bg-black text-white py-4 rounded-2xl font-bold mt-auto">PAGA ORA</button>
      </div>
    </div>
  );
};
export default TotemView;
