import { useState, type FormEvent } from "react";
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

        }catch (error){
            console.error(error);
            alert('login failed')
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
        <form
            onSubmit={handleLogin}
            className="w-full max-w-sm p-6 shadow-md rounded flex flex-col gap-4"
        >
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded p-2 w-full"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded p-2 w-full"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
                Login
            </button>
        </form>
    </div>
    );
};

export default Login;