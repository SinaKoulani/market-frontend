import axios from "axios";
import type { Order } from "../types/order";
import type { LoginPayload, LoginResponse, SignupPayload } from "../types/user";
import type { Product } from "../types/product";
import type { Cart } from "../types/cart";

const api = axios.create({
    baseURL: "/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;

export async function getOrders(): Promise<Order[]> {
  const response = await api.get<Order[]>("/orders");
  return response.data;
}

export async function getOrderById(id : string): Promise<Order>{
    const response = await api.get<Order>(`/orders/${id}`)

    return response.data;
}

export async function makePayment(orderId : string): Promise <void> {
    await api.post("/payments",{
        orderId,
    });
}

export async function signup(payload: SignupPayload): Promise<void> {
  await api.post("/auth/signup", payload);
}

export async function login(payload:LoginPayload): Promise<void> {
    const response =await api.post<LoginResponse>("/auth/login",payload)

    localStorage.setItem("token",response.data.token);
}

export async function getProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>("/products");
    return response.data;
}

export async function getProductById(id: string): Promise<Product> {
    const response = await api.get<{ product: Product }>(`/products/${id}`);
    return response.data.product;
}

export async function getCart(): Promise<Cart> {
    const response = await api.get<Cart>("/cart");
    return response.data;
}

export async function addToCart(
    productId: number,
    quantity: number
): Promise<void> {
    await api.post("/cart/items", {
        productId,
        quantity,
    });
}

export async function updateCartItem(
    productId: number,
    quantity: number
): Promise<void> {
    await api.patch(`/cart/items/${productId}`, {
        quantity,
    });
}

export async function removeFromCart(productId:number): Promise<void> {
   await api.delete(`/cart/items/${productId}`) 
}


export async function getAllOrdersAdmin(): Promise<Order[]> {
    const response = await api.get<Order[]>("/admin/orders");
    return response.data;
}

export async function createProduct(payload: {
    name: string;
    price: number;
    stock: number;
    description: string;
}): Promise<void> {
    await api.post("/products", payload);
}

export async function deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
}


export async function createOrder(): Promise<Order> {
    const response = await api.post<{ order: Order }>("/orders");
    return response.data.order;
}