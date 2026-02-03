const argon2 = require('argon2');
const userCol = require('./schemas').Users;
const Data = require('./Data');


class User {

   static async create(email, password) {
      const pwhash = await argon2.hash(password);
      // IMPLEMENT LOGIC TO AUTHENTICATE USER AND CREATE SESSION COOKIE ETC. HERE!
      const data = await Data.createData();
      const now = new Date();
      const startdate = (now.getFullYear()-1)+'-01-01';
      const enddate = now.toISOString().split('T')[0];
      const newUserDoc = new userCol({email: email,
                                             pwhash: pwhash,
                                             data: data,
                                             timeconfig: { 
                                                startdate: startdate,
                                                enddate: enddate
                                             }});
      return await newUserDoc.save();
   }
}

module.exports = User;