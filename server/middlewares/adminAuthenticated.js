module.exports =
  (redirect = '/admin/signin') =>
  (req, res, next) => {
    // Check if user session is active, that is if user is already authenticated
    if (!req.session?.user) {
      // As most get requests are page renders, we redirect to signin page if unauthenticated user tries to access any guarded page.
      if (req.method === 'GET') res.redirect(redirect);
      // For other operational requests, we send the HTTP 403 Forbidden response status code which indicates that the server refuses to authorize the request.
      else res.status(403).end();
    } else {
      next();
    }
  };