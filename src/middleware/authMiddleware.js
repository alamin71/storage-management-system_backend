const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // separate only token from Bearer TOKEN_VALUE
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // tokren check
    req.user = decoded; // user data set to request-
    next(); //permission to next go
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
