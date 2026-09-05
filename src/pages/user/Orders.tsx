import { useState, useEffect } from "react";
import type { Order } from "../../types/order";
import { getOrders } from "../../api/HandleApi";

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Your Orders
            </h1>

            {loading && (
                <p className="text-gray-400 text-center py-20">
                    Loading...
                </p>
            )}

            {!loading && (
                <div>
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-1 mb-4"
                        >
                            <p className="text-sm text-gray-400">
                                Order #{order.id}
                            </p>

                            <p className="text-red-600 font-bold text-xl mt-1">
                                {order.totalPrice}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                {order.createdAt}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;