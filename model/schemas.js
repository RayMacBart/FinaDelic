const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Model = Mongoose.model;

const userSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   pwhash: {
      type: String,
      required: true
   },
   // data: {
   //    type: Schema.Types.ObjectId,
   //    ref: 'data'
   // },
   // timeconfig: {
   //    type: {  // Mongoose only treats required as a schema option when it appears next to a type key!
   //       startdate: {
   //          type: Date,
   //          required: true
   //       },
   //       enddate: {
   //          type: Date,
   //          required: true
   //       },    
   //    },
   //    required: true
   // }
});

const dataSchema = new Schema({
   data: {
      IN: {
         type: Schema.Types.ObjectId,
         ref: 'bag'
      },
      OUT: {
         type: Schema.Types.ObjectId,
         ref: 'bag'
      }
   }
});

const bagSchema = new Schema({
   nestedBags: 
         [ {
            type: Schema.Types.ObjectId,
            ref: 'bag'
         } ],
   transactions: 
         [ {
            type: Schema.Types.ObjectId,
            ref: 'flow',  
         } ]
});

const flowSchema = new Schema({
   date: {
      type: Date,
      required: true
   },
   desc: {
      type: String,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   currency: {
      type: String,
      required: true
   }
});


exports.Users = Model('user', userSchema);
exports.Datas = Model('data', dataSchema);
exports.Bags = Model('bag', bagSchema);
exports.Flows = Model('flow', flowSchema);
