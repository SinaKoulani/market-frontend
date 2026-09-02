import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../../types/product";
import {getProducts, createProduct, deleteProduct,} from "../../api/HandleApi";

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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Manage Products
            </h1>

            <form
                onSubmit={handleCreate}
                className="border rounded p-4 shadow mb-6 flex flex-col gap-3 max-w-md"
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
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
                            className="border rounded p-4 shadow flex flex-col gap-2"
                        >
                            <p>Name: {product.name}</p>
                            <p>Price: {product.price}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Description: {product.description}</p>

                            <button
                                onClick={() => handleDelete(product.id)}
                                className="text-red-600 hover:underline self-start"
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