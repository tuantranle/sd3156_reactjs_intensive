export interface Category {
  name: string;
  img: string;
  code: string;
  categoryId: string;
}

export interface Product {
  id: string;
  name: string;
  img: string;
  regular_price: number;
  sale_price: number;
  rating: number;
  in_stock: number;
  category: Category;
}