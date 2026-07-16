import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't force top scroll when we're navigating
    // to a specific landing-page section.
    if (location.state?.scrollTo) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location]);

  return null;
};

export default ScrollToTop;
