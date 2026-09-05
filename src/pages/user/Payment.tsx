import { useParams } from "react-router-dom";
import { useState } from "react";
import { makePayment } from "../../api/HandleApi";

const Payment = () => {
    const { id } = useParams();
    const [processing, setProcessing] = useState<boolean>(false);

    async function handlePayment() {
        try {
            if (!id) return;

            setProcessing(true);

            await makePayment(id);

            alert("Payment successful!");
        } catch (error) {
            console.error(error);
            alert("Payment failed!");
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <div className="w-full max-w-sm rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-4 text-center">
                <h1 className="text-xl font-bold text-gray-900">
                    Complete Your Payment
                </h1>

                <p className="text-sm text-gray-400">
                    Order #{id}
                </p>

                <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="bg-red-600 text-white p-3 rounded-xl font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200 w-full disabled:opacity-50"
                >
                    {processing ? "Processing..." : "Pay Now"}
                </button>
            </div>
        </div>
    );
};

export default Payment;