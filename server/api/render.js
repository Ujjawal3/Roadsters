module.exports.login=(req,res)=>{
    res.render('signin')
}

module.exports.signup=(req,res)=>{
    res.render('signup');
}

module,exports.home=(req,res)=>{
    res.render('homepage');
}

module.exports.dashboard=(req,res)=>{
    res.render('dashboardseller',{bicycle: req.user.bicycles});
}

module.exports.profile=(req,res)=>{
    res.render('profileseller',{profile: req.user.profile})
}

module.exports.bicycle=(req,res)=>{
    res.render('bicycleseller',{bicycle: req.user.bicycles[req.params.index] , index: req.params.index, seller: req.user.userid})
}

module.exports.profileupdate=(req,res)=>{
    res.render('updateprofile',{user: req.user.profile})
}