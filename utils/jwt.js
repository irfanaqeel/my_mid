const jwt = require('jsonwebtoken');



const jwtUtility = {
  sign(payload) {
    const token = jwt.sign(payload,process.env.secretKey);
    return token;
  },
  verify(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  },
  verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId; // Add the decoded payload to the request object
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  }
};
//average
module.exports = jwtUtility;
