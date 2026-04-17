import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * 
 * Automatically resets the scroll position to the top of the viewport
 * whenever the location (URL path) changes. This fixes the common React Router
 * issue where navigation preserves the previous page's scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" for immediate reset during navigation
    });
  }, [pathname]);

  return null;
}
