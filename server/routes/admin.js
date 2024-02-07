const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();
const Admin = require('./../models/admin');
const ensureAuthenticated = require('../middleware/adminAuthenticated');



router.post('/admin/signin', async (req, res) => {
    const { username, password, rememberMe } = req.body;
  
    // Admin must exist in the database for sign in request
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(400)
        .render('admin/signin', { error: 'Wrong username or password' });
    }
  
    // Use bcrypt compare to validate the plain text password sent in the request body with the hashed password stored in the database
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);
    if (!isValidPassword) {
      return res
        .status(400)
        .render('admin/signin', { error: 'Wrong username or password' });
    }
  
    // If password is valid, it's a sign in success
    // Return admin details in response and session
    // Redirect to confirm sign in
    res.setHeader('admin', admin.id);
    // If user requested their sign in to be remembered, set session for 14 days. Otherwise it will be a one-time session.
    if (rememberMe) {
      req.session.cookie.maxAge = 14 * 24 * 3600 * 1000; // Value of 14 days in millseconds
    }
    req.session.admin = admin;
    res.redirect('/admin/authenticated');
  });


  router.post('/admin/signup', async (req, res) => {
    const {
        username,
        email,
      password
    } = req.body;
  
    
  
    // Admin must not exist in the database for sign up request
    let admin = await Admin.findOne({ username });
    if (admin) {
      return res
        .status(400)
        .render('admin/signup', { error: `${username}: username already used` });
    }
  

    const password_hash = await bcrypt.hash(password, 10);
  
    // Create the admin record on the database
    admin = await Admin.create({
        username,
        email,
      password
    });
  
    // Once user record is created, it's a sign up success
    // Return user details in response and session
    // Redirect to confirm sign up
    res.setHeader('admin', admin.username);
    req.session.admin = admin;
    res.redirect('/admin/authenticated');
  });
  
// Handles sign out request
router.get('/admin/signout', ensureAuthenticated('/'), (req, res) => {
    // Use express session destroy function which destroys the session and unsets the req.session property
    req.session.destroy();
    res.redirect('/');
  });
  
  // Renders sign up page
  router.get('/admin/signup', (req, res) => {
    // If user session is active, then they cannot sign up redirect to home page
    if (!req.session?.admin) res.render('admin/signup');
    else res.redirect('/');
  });
  
  // Renders sign in page
  router.get('/admin/signin', (req, res) => {
    // If user session is active, then they cannot sign in so redirect to home page
    if (!req.session?.admin) res.render('admin/signin');
    else res.redirect('/admin/authenticated');
  });
  


router.post("/", adminController.addNewShopItem);
router.put("/:id", adminController.updateShopItem);
router.delete("/:id", adminController.deleteShopItem);
router.get("/search", adminController.searchShopItems);

module.exports = router;