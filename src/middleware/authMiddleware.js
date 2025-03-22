const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN_VALUE" থেকে শুধু টোকেন আলাদা করা

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // টোকেন যাচাই করা
    req.user = decoded; // ইউজারের ডাটা request-এ সেট করা
    next(); // পরবর্তী middleware বা controller-এ যাওয়ার অনুমতি দেওয়া
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
