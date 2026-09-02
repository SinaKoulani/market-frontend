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
        <div>
            <h1 className="text-2xl font-bold mb-4 p-4">
                All Orders
            </h1>

            {loading && <p>Loading...</p>}

            {!loading && (
                <div className="p-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="border rounded p-4 shadow mb-2 mx-4"
                        >
                            <p>Order ID: {order.id}</p>
                            <p>Total Price: {order.totalPrice}</p>
                            <p>Created At: {order.createdAt}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllOrders;