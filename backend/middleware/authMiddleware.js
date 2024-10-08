const jwt = require("jsonwebtoken");

// This function will authenticate the token and authorize roles
function authenticateAndAuthorize(...roles) {
  // Return an express middleware function
  return async (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.header("Authorization");
    // Extract the token from the Authorization header
    const token = authHeader && authHeader.split(" ")[1];
    // If there's no token, send a 401 Unauthorized response
    if (!token) {
      req.user = null;
      return next();
      // return res.status(401).json({ message: "Authentication failed" });
    }
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // If the token is invalid, send a 403 Forbidden response
      if (err) return res.status(403).json({ message: "Invalid Token" });

      // If the user's role is not authorized, send a 403 Forbidden response
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ message: "User role not authorized" });
      }

      // If the token is valid and the user's role is authorized, attach the user to the request
      req.user = user;
      // Call the next middleware or route handler
      next();
    });
  };
}

module.exports = {
  authenticateAndAuthorize
};