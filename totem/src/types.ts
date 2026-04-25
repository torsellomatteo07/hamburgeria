export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  READY = 'ready',
  COMPLETED = 'completed'
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: 'panini' | 'contorni' | 'bevande';
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
  orderNumber: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
}
