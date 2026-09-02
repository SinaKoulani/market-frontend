import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 p-4">
            <h1 className="text-6xl font-bold text-red-600">
                404
            </h1>

            <p className="text-xl text-gray-600">
                Page not found
            </p>

            <Link
                to="/"
                className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 mt-4"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;