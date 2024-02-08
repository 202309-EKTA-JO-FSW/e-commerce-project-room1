const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  redirect = '/customers/signin'

  if (!token) {
    if (req.method === 'GET') res.status(403).json('redirecting user to signIn');
    else res.status(403).end();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (req.method === 'GET') res.status(403).json('redirecting user to signIn')
        else res.status(403).json({ message: "Authentication failed"}).end();
      } else {
        req.user = user;
        next();
      }
    });
  }
};