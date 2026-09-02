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
            <section className="py-16 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold">
                        Welcome to Our Market
                    </h1>

                    <p className="text-gray-600 mt-4">
                        Find the best products at great prices.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">
                    Featured Products
                </h2>

                {loading && <p>Loading...</p>}

                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="border rounded p-4 shadow"
                            >
                                <p>Name: {product.name}</p>
                                <p>Price: {product.price}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;