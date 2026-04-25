export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'panini' | 'contorni' | 'bevande' | 'dessert';
}
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number | string;
  orderNumber: number;
}
