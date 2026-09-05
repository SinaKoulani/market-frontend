import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getProductById, addToCart } from "../../api/HandleApi";

interface ProductDetailDrawerProps {
    productId: number | null;
    onClose: () => void;
}

const ProductDetailDrawer = ({
    productId,
    onClose,
}: ProductDetailDrawerProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isVisible, setIsVisible] = useState(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [adding, setAdding] = useState<boolean>(false);

    useEffect(() => {
        if (productId === null) {
            setIsVisible(false);
            return;
        }

        setProduct(null);
        setLoading(true);
        setQuantity(1);

        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        async function fetchProduct() {
            try {
                const data = await getProductById(productId?.toString() ?? "");
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [productId]);

    async function handleAddToCart() {
        if (product === null) {
            return;
        }

        setAdding(true);

        try {
            await addToCart(product.id, quantity);
            alert("Added to cart!");
        } catch (error) {
            console.error(error);
            alert("Failed to add to cart");
        } finally {
            setAdding(false);
        }
    }

    if (productId === null) {
        return null;
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transition-transform duration-300 ${
                    isVisible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-200"
                >
                    ✕
                </button>

                <div className="p-6 flex flex-col gap-3">
                    {loading && <p className="text-gray-400">Loading...</p>}

                    {!loading && product && (
                        <>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {product.name}
                            </h2>

                            <p className="text-red-600 font-bold text-2xl mt-1">
                                {product.price}
                            </p>

                            <p className="text-sm text-gray-400">
                                {product.stock > 0
                                    ? `In stock: ${product.stock}`
                                    : "Out of stock"}
                            </p>

                            <p className="text-gray-600 text-base mt-4 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="border-t border-gray-100 my-4" />

                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => setQuantity(quantity - 1)}
                                    disabled={quantity <= 1}
                                    className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    -
                                </button>

                                <span>{quantity}</span>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={quantity >= product.stock}
                                    className="w-8 h-8 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding || product.stock === 0}
                                className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 hover:shadow-md transition-all duration-200 mt-4 w-full disabled:opacity-50"
                            >
                                {adding ? "Adding..." : "Add to Cart"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetailDrawer;