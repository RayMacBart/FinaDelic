const argon2 = require('argon2');
const crypto = require('crypto');
const userCol = require('./schemas').Users;
const Data = require('./Data');


class User {

   static async create(email, password) {
      const emailHash = await crypto.createHash("sha256").update(email).digest("base64");
      const pwhash = await argon2.hash(password);
      const data = await Data.createData();
      const now = new Date();
      const startdate = (now.getFullYear()-1)+'-01-01';
      const enddate = now.toISOString().split('T')[0];
      return await userCol.create({
                                    email: 'placeholder',
                                    emailHash: email,
                                    pwhash: pwhash,
                                    data: data,
                                    timeconfig: { 
                                       startdate: startdate,
                                       enddate: enddate
                                    }});
   }
}

module.exports = User;