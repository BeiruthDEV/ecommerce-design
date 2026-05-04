export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type PaymentMethod = "cartao" | "pix" | "boleto";

export type OrderItem = {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
};

export type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  address: string;
  payment_method: string;
  payment_status: string;
  payment_details: string;
  status: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  created_at: string;
  items: OrderItem[];
};

export type Notification = {
  id: number;
  order_id: number;
  channel: string;
  message: string;
  created_at: string;
};
