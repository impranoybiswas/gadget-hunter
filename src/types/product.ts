export interface Product {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  category: string;
  warranty: string;
  description: string;
  images: string[];
  totalPrice?: number;
  totalProducts?: number ;
  cartQuantity?: number;
}

export interface PaginatedResponse {
  page: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}


export interface BannerItem {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  video: string;
}

export interface Payment {
  tranId: string;
  user: string;
  items: { id: string; quantity: number }[];
  amount: number;
  status: string;
  createdAt: string;
  paidAt?: string;
}