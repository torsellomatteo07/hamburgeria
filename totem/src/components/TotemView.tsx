import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Product, CartItem } from '../types';
import { ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TotemView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: Math.random().toString(), productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.productId !== productId);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
        <CheckCircle className="w-24 h-24 text-green-500 mb-4" />
        <h1 className="text-4xl font-black">ORDINE INVIATO!</h1>
        <button onClick={() => setOrderComplete(false)} className="mt-8 text-orange-600 font-bold underline">Torna al Menu</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-black mb-8">HAMBURGERIA <span className="text-orange-600">DIGITAL</span></h1>
        <div className="grid grid-cols-2 gap-6">
          {MENU_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border">
               <img src={item.image} className="w-full h-40 object-cover rounded-2xl mb-4" />
               <h3 className="text-xl font-bold">{item.name}</h3>
               <p className="text-gray-500 text-sm">{item.price.toFixed(2)}€</p>
               <button onClick={() => addToCart(item)} className="w-full mt-4 bg-orange-600 text-white font-bold py-3 rounded-xl">AGGIUNGI</button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-96 bg-white border-l p-8 flex flex-col">
        <h2 className="text-2xl font-black mb-6">CARRELLO</h2>
        <div className="flex-1">
          {cart.map(item => (
            <div key={item.productId} className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-xl">
              <span>{item.name} x{item.quantity}</span>
              <div className="flex gap-2">
                <button onClick={() => removeFromCart(item.productId)}><Minus className="w-5 h-5"/></button>
                <button onClick={() => addToCart(MENU_ITEMS.find(i => i.id === item.productId)!)}><Plus className="w-5 h-5"/></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t">
          <div className="flex justify-between text-2xl font-black mb-4"><span>TOTALE</span><span>{total.toFixed(2)}€</span></div>
          <button onClick={() => setOrderComplete(true)} className="w-full bg-black text-white py-4 rounded-2xl font-bold">ORDINA</button>
        </div>
      </div>
    </div>
  );
};

export default TotemView;
