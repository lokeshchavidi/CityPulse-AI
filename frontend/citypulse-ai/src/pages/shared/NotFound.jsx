import { Link } from "react-router-dom";
import { Home, MapPinOff } from "lucide-react";

import Button from "@/components/common/Button/Button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
        <MapPinOff size={28} aria-hidden="true" />
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-700">
        Error 404
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/" className="mt-8">
        <Button leftIcon={<Home size={18} aria-hidden="true" />}>
          Back to home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
