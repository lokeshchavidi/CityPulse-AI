import { Link } from "react-router-dom";
import { MapPinOff, Home } from "lucide-react";

import Button from "@/components/common/Button/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <MapPinOff size={36} className="text-blue-700" />
      </div>

      <h1 className="mt-8 text-6xl font-extrabold text-slate-900">404</h1>

      <h2 className="mt-3 text-2xl font-semibold text-slate-800">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-slate-600">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/" className="mt-8">
        <Button leftIcon={<Home size={18} />}>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
