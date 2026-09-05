import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { getProducts } from "../../api/HandleApi";

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    const featuredProducts = products.slice(0, 4);

    return (
        <div>
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
                            Welcome to Our Market
                        </h1>

                        <p className="text-lg text-gray-600 mt-4">
                            Find the best products at great prices.
                        </p>

                        <Link
                            to="/products"
                            className="inline-block bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200 mt-8"
                        >
                            Shop Now
                        </Link>
                    </div>

                    <div className="aspect-square bg-gradient-to-br from-red-50 to-gray-100 rounded-2xl flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                            Hero image
                        </span>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 pb-20">
                <p className="text-red-600 uppercase tracking-wide text-sm font-semibold">
                    TRENDING NOW
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                    Featured Products
                </h2>

                {loading && <p>Loading...</p>}

                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6"
                            >
                                <p className="font-semibold text-gray-900">
                                    {product.name}
                                </p>

                                <p className="text-red-600 font-bold text-lg mt-2">
                                    {product.price}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;