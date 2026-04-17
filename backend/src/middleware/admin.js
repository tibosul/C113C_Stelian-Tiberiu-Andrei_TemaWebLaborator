/**
 * Admin Middleware
 * 
 * Ensures that the authenticated user has administrative privileges.
 * Should be used AFTER authMiddleware.
 */
export default function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (!req.user.is_admin) {
    return res.status(403).json({ error: "Access denied: Administrative privileges required" });
  }

  next();
}
