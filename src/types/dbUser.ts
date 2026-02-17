export interface CartItem {
  productId: string;
  quantity: number;
}

export interface DBUser extends Document {
  _id: string;
  email: string;
  name: string;
  provider: string;
  image?: string;
  gender?: string;
  role: string;
  createdAt: string;
  lastSignInAt?: string;
  favorites: string[];
  carts: CartItem[];
}
