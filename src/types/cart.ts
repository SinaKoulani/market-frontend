import type { Product } from "./product";

export interface CartItem {
    id: number;
    quantity: number;
    product: Product;
}

export interface Cart {
    id: number;
    items: CartItem[];
}

