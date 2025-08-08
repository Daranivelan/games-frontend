import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br text-[#e6e5c7] from-[#1a1814] to-[#2d2a1f] flex flex-col justify-center items-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold mb-4">404</h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Page Not Found</h2>

        <p className="text-lg mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-[#ff4e08] hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="bg-gray-700 hover:bg-gray-600 text-white cursor-pointer font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
