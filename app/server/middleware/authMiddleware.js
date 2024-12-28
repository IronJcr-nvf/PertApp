const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (!token) {
    return res.status(403).json({
      status: "fail",
      message: "Access denied. No token provided."
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid token"
      });
    }

    req.user = decoded; // Attach the decoded token to the request object
    next();
  });
};

module.exports = protect;
