import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t mt-12 py-6 text-center text-sm text-gray-600">
            <p className="font-semibold">Market</p>

            <div className="flex justify-center gap-4 my-2">
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
            </div>

            <p>© 2026 Market. All rights reserved.</p>
        </footer>
    );
};

export default Footer;