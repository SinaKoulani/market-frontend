import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        !!localStorage.getItem("token")
    );

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-8 py-3">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-red-600 transition-transform duration-200 hover:scale-105"
                >
                    Market
                </Link>

                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-1">
                    <Link
                        to="/products"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:text-red-600 hover:shadow-sm"
                    >
                        Products
                    </Link>

                    <Link
                        to="/cart"
                        className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white hover:text-red-600 hover:shadow-sm"
                    >
                        Cart
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg px-3 py-2 bg-gray-100 text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-red-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md hover:-translate-y-0.5"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;