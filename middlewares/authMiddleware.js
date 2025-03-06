const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // Extract token part
  }

  try {
    //gives error if unable to verify else attach user data to request and continue
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;