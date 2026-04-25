import { Product } from './types';

export const MENU_ITEMS: Product[] = [
  {
    id: 'b1',
    name: 'Classic Cheeseburger',
    description: 'Manzo 100%, cheddar, lattuga, pomodoro e salsa segreta.',
    price: 8.50,
    category: 'panini',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'
  },
  {
    id: 'b2',
    name: 'Bacon BBQ King',
    description: 'Doppio bacon croccante, salsa BBQ e cheddar fuso.',
    price: 10.50,
    category: 'panini',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400'
  },
  {
    id: 's1',
    name: 'Patatine Classiche',
    description: 'Taglio artigianale, salate a mano.',
    price: 3.50,
    category: 'contorni',
    image: 'https://images.unsplash.com/photo-1573088693280-2e119cf81bd4?w=400'
  },
  {
    id: 'd1',
    name: 'Coca Cola 33cl',
    description: 'In lattina.',
    price: 2.50,
    category: 'bevande',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400'
  }
];
