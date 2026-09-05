import { useEffect, useState } from "react";
import type { Order } from "../../types/order";
import { getAllOrdersAdmin } from "../../api/HandleApi";

const AllOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const data = await getAllOrdersAdmin();
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
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                All Orders
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
                            className="border rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-5 mb-4"
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

export default AllOrders;