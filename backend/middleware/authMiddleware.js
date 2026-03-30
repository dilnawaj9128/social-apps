const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // ❌ token nahi mila
  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    // ✅ token verify
    const decoded = jwt.verify(token, "secret");

    // user info request me attach
    req.user = decoded;

    next(); // aage route pe jao
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;