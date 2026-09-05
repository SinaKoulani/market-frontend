import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Order } from "../../types/order";
import { getOrderById } from "../../api/HandleApi";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                if (!id) return;

                const data = await getOrderById(id);
                setOrder(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [id]);

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            {loading && (
                <p className="text-gray-400 text-center py-20">
                    Loading...
                </p>
            )}

            {!loading && order && (
                <div className="rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-2">
                    <p className="text-sm text-gray-400">
                        Order #{order.id}
                    </p>

                    <p className="text-red-600 font-bold text-2xl mt-1">
                        {order.totalPrice}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        {order.createdAt}
                    </p>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;