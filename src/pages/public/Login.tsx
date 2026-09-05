import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { login } from "../../api/HandleApi";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        try {
            await login({
                email,
                password,
            });
            window.location.href = "/";
        } catch (error) {
            console.error(error);
            alert("login failed");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-md grid grid-cols-1 md:grid-cols-2">
                <div className="flex flex-col justify-center px-8 py-12 md:px-12">
                    <p className="text-2xl font-bold text-red-600 mb-8">
                        Market
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Log in to continue to Market
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="w-full max-w-sm flex flex-col gap-4"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-200 rounded-xl p-3 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors duration-200"
                        />

                        <button
                            type="submit"
                            className="bg-red-600 text-white p-3 rounded-xl font-semibold hover:bg-red-700 hover:shadow-md transition-all duration-200"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-gray-500 text-sm text-center max-w-sm mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-red-600 font-semibold hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 p-8">
                    <div className="w-full max-w-md aspect-square rounded-2xl bg-white/50 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                            Login image
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;