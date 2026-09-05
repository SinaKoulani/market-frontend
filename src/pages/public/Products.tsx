import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import { getProducts } from "../../api/HandleApi";
import ProductDetailDrawer from "../../components/product/ProductDetailDrawer";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    All Products
                </h1>

                <p className="text-gray-500 mt-1">
                    Browse our full collection
                </p>
            </div>

            {loading && (
                <p className="text-gray-400 text-center py-20">
                    Loading...
                </p>
            )}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectedProductId(product.id)}
                            className="rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 cursor-pointer"
                        >
                            <p className="font-semibold text-gray-900 text-lg">
                                {product.name}
                            </p>

                            <p className="text-red-600 font-bold text-lg mt-2">
                                {product.price}
                            </p>

                            <p className="text-sm text-gray-400 mt-1">
                                {product.stock > 0
                                    ? `In stock: ${product.stock}`
                                    : "Out of stock"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <ProductDetailDrawer
                productId={selectedProductId}
                onClose={() => setSelectedProductId(null)}
            />
        </div>
    );
};

export default Products;