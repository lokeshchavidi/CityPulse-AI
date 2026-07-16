import { Link } from "react-router-dom";
import { ServerCrash, Home, RefreshCw } from "lucide-react";

import Button from "@/components/common/Button/Button";

const ServerError = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <ServerCrash size={36} className="text-red-700" />
      </div>

      <h1 className="mt-8 text-6xl font-extrabold text-slate-900">500</h1>

      <h2 className="mt-3 text-2xl font-semibold text-slate-800">
        Something Went Wrong
      </h2>

      <p className="mt-3 max-w-md text-slate-600">
        An unexpected error occurred on our end. Please try again in a
        moment.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          leftIcon={<RefreshCw size={18} />}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>

        <Link to="/">
          <Button leftIcon={<Home size={18} />}>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default ServerError;
