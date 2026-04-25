import React, { useState } from 'react';
import { MENU_ITEMS } from '../data';
import { Product, CartItem, OrderStatus } from '../types';
import { ShoppingCart, Plus, Minus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TotemView: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [lastOrderNum, setLastOrderNum] = useState<number | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: Math.random().toString(36).substr(2, 9), productId: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const removeFromCart = (pid: string) => {
    setCart(prev => {
      const item = prev.find(i => i.productId === pid);
      if (item && item.quantity > 1) {
        return prev.map(i => i.productId === pid ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.productId !== pid);
    });
  };

  const sendOrder = async () => {
    const num = Math.floor(Math.random() * 99) + 1;
    setLastOrderNum(num);
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => setOrderComplete(false), 5000);
  };

  if (orderComplete) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-3xl shadow-xl border-4 border-orange-200">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-black mb-2">ORDINE INVIATO!</h1>
        <div className="bg-orange-600 text-white text-6xl font-black p-6 rounded-xl inline-block mt-4">#{lastOrderNum}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-black mb-8">MENÙ <span className="text-orange-600">HAMBURGERIA</span></h1>
        <div className="grid grid-cols-2 gap-6">
          {MENU_ITEMS.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <img src={item.image} className="w-full h-40 object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-xl">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.price.toFixed(2)}€</p>
              <button onClick={() => addToCart(item)} className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg">AGGIUNGI</button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-80 bg-white border-l p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShoppingCart /> CARRELLO</h2>
        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl text-sm">
              <div><p className="font-bold">{item.name}</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => removeFromCart(item.productId)}><Minus size={14}/></button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(MENU_ITEMS.find(i=>i.id===item.productId)!)}><Plus size={14}/></button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={sendOrder} disabled={cart.length === 0} className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4">ORDINA ORA</button>
      </div>
    </div>
  );
};
export default TotemView;
