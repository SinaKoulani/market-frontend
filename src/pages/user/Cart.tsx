import { useEffect, useState } from "react";
import type { Cart as CartType } from "../../types/cart";
import {
    getCart,
    updateCartItem,
    removeFromCart,
} from "../../api/HandleApi";

const Cart = () => {
    const [cart, setCart] = useState<CartType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function fetchCart() {
        setLoading(true);

        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    async function handleUpdateQuantity(productId: number, quantity: number) {
        try {
            await updateCartItem(productId, quantity);
            await fetchCart();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRemove(productId: number) {
        try {
            await removeFromCart(productId);
            await fetchCart();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="p-4">
            {loading && <p>Loading...</p>}

            {!loading && cart && (
                <>
                    {cart.items.length === 0 ? (
                        <p className="text-center text-gray-500 py-12">
                            Your cart is empty
                        </p>
                    ) : (
                        <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded p-4 shadow flex items-center justify-between"
                                >
                                    <div className="flex flex-col">
                                        <p className="font-semibold">
                                            {item.product.name}
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            {item.product.price}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.product.id,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 border rounded hover:bg-gray-100"
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(
                                                    item.product.id,
                                                    item.quantity + 1
                                                )
                                            }
                                            className="w-8 h-8 border rounded hover:bg-gray-100"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRemove(item.product.id)
                                            }
                                            className="text-red-600 hover:underline ml-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
                                <span>Total</span>
                                <span>
                                    {cart.items.reduce(
                                        (total, item) =>
                                            total +
                                            item.product.price *
                                                item.quantity,
                                        0
                                    )}
                                </span>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;