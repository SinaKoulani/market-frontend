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
        <nav className="flex items-center justify-between px-6 py-4 shadow bg-white">
            <Link to="/" className="text-xl font-bold">
                Market
            </Link>

            <div className="flex gap-6">
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
            </div>

            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;