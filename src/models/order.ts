export interface Category {
    name: string;
    img: string;
    code: string;
    categoryId: string;
  }
  
  export interface Payment {
    amount: number;
    received: number;
  }
  
  export interface Product {
    name: string;
    regular_price: number;
    sale_price: number;
  }
  
  export interface Order {
    orderNumber: string;
    sku: string;
    status: string;
    category: Category;
    payment: Payment;
    product: Product;
    customer: string;
    created: string;
    updated: string;
  }
  