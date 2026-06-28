const { String } = require('core-js');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Model = Mongoose.model;

const userSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   emailHash: {
      type: String,
      required: true
   },
   pwhash: {
      type: String,
      required: true
   },
   mailLinkTokenHash: {
      type: String
   },
   mailLinkExp: {
      type: Number
   },
   clientStorageID: {
      type: String,
      required: true
   },
   data: {
      type: Schema.Types.ObjectId,
      ref: 'data'
   },
   timeconfig: {
      type: {  // Mongoose only treats 'required' as a schema option when it appears next to a type key!
         startdate: {
            type: Date,
            required: true
         },
         enddate: {
            type: Date,
            required: true
         },
         rollingEndDate: {
            type: Boolean,
            // required: true
         }
      },
      required: true
   }
});


const dataSchema = new Schema({
   IN: {
      type: Schema.Types.ObjectId,
      ref: 'bag',
      required: true
   },
   OUT: {
      type: Schema.Types.ObjectId,
      ref: 'bag',
      required: true
   },
   chartPaths: [ 
      {type: String}
    ]
});


const bagSchema = new Schema({
   nestedBags: 
      [ {
         name: String,
         bag: {
            type: Schema.Types.ObjectId,
            ref: 'bag'
         }
      } ],
   transactions: 
      [ {
         type: Schema.Types.ObjectId,
         ref: 'flow',  
      } ]
});


const flowSchema = new Schema({
   frontId: {
      type: Number,
      required: true
   },
   date: {
      type: String,  // Not "Date" anymore, because this fields wil be encrypted
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   amount: {
      type: String,  // Not "Number" anymore, because this fields wil be encrypted
      required: true
   },
   currency: {
      type: String,
      required: true
   }
});

const tokenSchema = new Schema({
   val: {
      type: String
   },
   exp: {
      type: Number
   },
   emailHash: {
      type: String
   },
   pw: {
      type: String
   }
});


exports.Users = Model('user', userSchema);
exports.Datas = Model('data', dataSchema);
exports.Bags = Model('bag', bagSchema);
exports.Flows = Model('flow', flowSchema);
exports.Tokens = Model('token', tokenSchema);
