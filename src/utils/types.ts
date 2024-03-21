//defining the user model type
export interface UserType {
  id?: string;
  name: string;
  password: string;
  email: string;
  cartToken?: string;
}

//defining the cart model type

export interface CartType {
  id?: string;
  userId: string;
  productId: string;
  cartToken: string;
}

//defining the order model type

export interface OrderType {
  id?: string;
  userId: string;
  payment: string;
  address: string;
  contact: string;
  status?: "ordered" | "pending" | "cancelled" | "delivered";
}

//defining the product model type
export interface ProductType {
  id?: string;
  img: string;
  title: string;
  price: number;
  textPrice: string;
  category: string;
  subCategory: string;
}
