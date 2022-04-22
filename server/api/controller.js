const db = require('../db/model.js')
const passport = require('../passport.js');
const bcrypt=require('bcrypt');

module.exports.login = passport.authenticate('local', {
    successRedirect: '/seller/dashboard',
    failureRedirect: '/login',
    failureFlash: true
})

module.exports.dashboard = async (req, res) => {
    const user = await db.find({});
    res.render('dashboardbuyer',{user: user});
}

module.exports.profile = async (req, res) => {
    const user = await db.where("userid").equals(req.params.seller);
    res.render('profilebuyer', { profile: user[0].profile })
}

module.exports.bicycle=async (req,res)=>{
    const user=await db.where("userid").equals(req.query.seller);
    res.render('bicyclebuyer',{bicycle:user[0].bicycles[req.query.index], seller:req.query.seller});
}

module.exports.signup = async (req, res) => {
    const user = await db.where("userid").equals(req.body.userid)

    if (user.length !== 0) {
        req.flash('error_msg', "Username in use! Choose a different Username");
        res.redirect('/signup');
    }
    else if (req.body.password != req.body.confirmpassword) {
        req.flash('error_msg', "Password and Confirm password do not match");
        res.redirect('/signup');
    }
    else {
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new db({
            userid: req.body.userid,
            password: hashedPassword,
            profile: {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
            },
        });
        await user.save();
        req.flash('success_msg', 'You are now registered.Please log in');
        res.redirect('/login');
    }
}

module.exports.update = async (req, res) => {

    if (req.user.bicycles.length >= (parseInt(req.params.index) + 1)) {
        const bicycle = req.user.bicycles[req.params.index];
        res.render('updatebicycle', { bicycle: bicycle, index: req.params.index })
    }
    else {
        const bicycle = {
            title: " ",
            description: " ",
            SP: " ",
        }
        res.render('updatebicycle', { bicycle: bicycle, index: req.params.index })
    }
}

module.exports.save = async (req, res) => {
    if(req.user.bicycles.length >= (parseInt(req.params.index) + 1))
    {
        req.user.bicycles[req.params.index].title = req.body.title;
        req.user.bicycles[req.params.index].description = req.body.description;
        req.user.bicycles[req.params.index].SP = req.body.SP;
    }
    else
    {
        const bicycle = {
            title: req.body.title,
            description: req.body.description,
            SP: req.body.SP,
        }
        req.user.bicycles.push(bicycle);
    }

    await req.user.save();
    res.redirect('/seller/dashboard');
}

module.exports.logout = (req, res) => {
    req.logOut()
    res.redirect('/');
}

module.exports.delete = async(req,res)=>{
    const user= await db.where("userid").equals(req.query.id);
    user[0].bicycles.splice(req.query.index,1);
    await user[0].save();
    res.send("done");
}

module.exports.updateprofile= async (req,res)=>{
    req.user.profile.name=req.body.name,
    req.user.profile.phone=req.body.phone,
    req.user.profile.email=req.body.email,
    await req.user.save();
    res.redirect('/seller/profile');

}