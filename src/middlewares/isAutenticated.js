const jwt = require("jsonwebtoken");
const { TOKEN_SECRETO } = require('../../config/configIndex');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRETO);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;