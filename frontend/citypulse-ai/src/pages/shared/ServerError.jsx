import { Link } from "react-router-dom";
import { Home, RefreshCw, ServerCrash } from "lucide-react";

import Button from "@/components/common/Button/Button";

const ServerError = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-50 text-red-700">
        <ServerCrash size={28} aria-hidden="true" />
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-red-700">
        Error 500
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Something went wrong
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        An unexpected error occurred on our end. Please try again in a moment.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          leftIcon={<RefreshCw size={18} aria-hidden="true" />}
          onClick={() => window.location.reload()}
        >
          Try again
        </Button>

        <Link to="/">
          <Button leftIcon={<Home size={18} aria-hidden="true" />}>
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
