const passport = require('../server.js');
const LocalStrategy = require('passport-local').Strategy
const db = require('./db/model.js')
const bcrypt=require('bcrypt');


const authenticateUser = async (userid, pass, done) => {
  try {
    const user = await db.where("userid").equals(userid);
    if(user.length===0){return done(null, false, { message: 'Invalid Login Credentials!!' })}
    if (!await bcrypt.compare(pass, user[0].password)) {
      return done(null, false, { message: 'Invalid Login Credentials!!' })
    }
    else return done(null, user[0]);
  }
  catch (e) { return done(e) }
}

passport.use(new LocalStrategy({ usernameField: 'userid', passwordField: 'pass' }, authenticateUser))
passport.serializeUser((user, done) => done(null, user.userid))
passport.deserializeUser(async (userid, done) => {
  const user = await db.where("userid").equals(userid);
  return done(null, user[0]);
})

module.exports = passport;