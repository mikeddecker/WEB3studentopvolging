const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.student_token) {
      const token = req.cookies.student_token;

      const student = jwt.verify(token, process.env.JWT_SECRET);
      if (student) {
        req.student = student;
      }
      next();
    }
  } catch (error) {
    res.status(403).send("Unauthorized");
  }
};

module.exports = authMiddleware;
