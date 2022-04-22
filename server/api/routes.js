const express=require('express');
const route=express.Router();
const controller=require('./controller.js');
const render=require('./render.js');


route.get('/login',checkNotAuthenticated,render.login);
route.get('/signup',checkNotAuthenticated,render.signup);
route.get('/',render.home);
route.get('/logout',controller.logout);

route.get('/seller/update/profile',checkAuthenticated,render.profileupdate);
route.get('/seller/dashboard',checkAuthenticated,render.dashboard);
route.get('/seller/profile',checkAuthenticated,render.profile);
route.get('/seller/update/:index',checkAuthenticated,controller.update);
route.get('/seller/bicycle/:index',checkAuthenticated,render.bicycle);



route.get('/buyer/dashboard',controller.dashboard);
route.get('/buyer/bicycle',controller.bicycle);
route.get('/buyer/profile/:seller',controller.profile);


route.post('/seller/update/profile',controller.updateprofile)
route.post('/signup',controller.signup);
route.post('/login',controller.login);
route.post('/seller/save/:index',controller.save);
route.delete('/delete',controller.delete)

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/seller/dashboard')
    }
    next()
  }


module.exports=route;
