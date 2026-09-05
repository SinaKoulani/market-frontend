import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t border-gray-100 mt-12 py-10 text-center">
            <p className="text-lg font-bold text-gray-900">
                Market
            </p>

            <div className="flex justify-center gap-6 my-2">
                <Link
                    to="/products"
                    className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                    Products
                </Link>

                <Link
                    to="/cart"
                    className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                    Cart
                </Link>

                <Link
                    to="/login"
                    className="text-gray-600 hover:text-red-600 transition-colors duration-200"
                >
                    Login
                </Link>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                © 2026 Market. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;