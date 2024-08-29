export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface CartItemData {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartItem {
  product: CartItemData;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

export interface StoreCart {
  id: number;
  quantity: number;
}

export interface CategoryList {
  data: string[];
}

export interface PaginatedProductData {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export interface ApiResponse<T> {
  state: string;
  data?: T;
  error?: any;
}

export interface ShippingForm {
  deliveryMethod: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  termsAccepted: boolean;
}
export interface ConfirmationDialogData {
  title: string;
  desc: string;
}
