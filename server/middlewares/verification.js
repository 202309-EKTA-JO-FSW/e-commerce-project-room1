const jwt = require('jsonwebtoken');

module.exports = (redirect = '/customers/signin') => (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    if (req.method === 'GET') res.redirect(redirect);
    else res.status(403).end();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (req.method === 'GET') res.redirect(redirect);
        else res.status(403).end();
      } else {
        req.user = user;
        next();
      }
    });
  }
};