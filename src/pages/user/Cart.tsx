import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Cart as CartType } from "../../types/cart";
import {
    getCart,
    updateCartItem,
    removeFromCart,
    createOrder,
} from "../../api/HandleApi";

const Cart = () => {
    const [cart, setCart] = useState<CartType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [placingOrder, setPlacingOrder] = useState<boolean>(false);

    const navigate = useNavigate();

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

    async function handlePlaceOrder() {
        setPlacingOrder(true);

        try {
            const order = await createOrder();
            navigate(`/payment/${order.id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to place order");
        } finally {
            setPlacingOrder(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Your Cart
            </h1>

            {loading && <p className="text-gray-400 text-center py-20">Loading...</p>}

            {!loading && cart && (
                <>
                    {cart.items.length === 0 ? (
                        <div className="py-20 flex flex-col items-center gap-2 text-center">
                            <p className="text-gray-500 text-lg">
                                Your cart is empty
                            </p>
                            <p className="text-gray-400 text-sm">
                                Add some products to get started
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex flex-col">
                                        <p className="font-semibold text-gray-900">
                                            {item.product.name}
                                        </p>

                                        <p className="text-red-600 font-semibold text-sm mt-1">
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
                                            className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
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
                                            className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleRemove(item.product.id)
                                            }
                                            className="text-red-600 hover:underline transition-colors duration-200 ml-6"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t-2 border-gray-100 pt-4 mt-6 flex justify-between items-center">
                                <span className="text-gray-600">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-gray-900">
                                    {cart.items.reduce(
                                        (total, item) =>
                                            total +
                                            item.product.price *
                                                item.quantity,
                                        0
                                    )}
                                </span>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={placingOrder}
                                className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 hover:shadow-md transition-all duration-200 w-full mt-4 disabled:opacity-50"
                            >
                                {placingOrder
                                    ? "Placing order..."
                                    : "Place Order"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;