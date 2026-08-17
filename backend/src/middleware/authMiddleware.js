const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "ERR", message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: "ERR", message: "Token expired" });
    }
    return res.status(401).json({ status: "ERR", message: "Token is invalid" });
  }
};

module.exports = authMiddleware;
