import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../../types/product";
import {
    getProducts,
    createProduct,
    deleteProduct,
} from "../../api/HandleApi";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    async function fetchProducts() {
        setLoading(true);

        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleCreate(e: FormEvent) {
        e.preventDefault();

        try {
            await createProduct({
                name,
                price: Number(price),
                stock: Number(stock),
                description,
            });

            setName("");
            setPrice("");
            setStock("");
            setDescription("");

            await fetchProducts();
        } catch (error) {
            console.error(error);
            alert("Failed to create product");
        }
    }

    async function handleDelete(id: number) {
        try {
            await deleteProduct(id);
            await fetchProducts();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Manage Products
            </h1>

            <form
                onSubmit={handleCreate}
                className="rounded-xl border border-gray-100 shadow-sm p-6 mb-8 flex flex-col gap-4 max-w-md"
            >
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Add New Product
                </h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white p-3 rounded-xl font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
                >
                    Add Product
                </button>
            </form>

            {loading && <p>Loading...</p>}

            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-1"
                        >
                            <p className="font-semibold text-gray-900 text-lg">
                                {product.name}
                            </p>

                            <p className="text-red-600 font-bold text-lg mt-1">
                                {product.price}
                            </p>

                            <p className="text-sm text-gray-400">
                                In stock: {product.stock}
                            </p>

                            <p className="text-gray-600 text-sm mt-2">
                                {product.description}
                            </p>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:underline transition-colors duration-200 self-start mt-2"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;