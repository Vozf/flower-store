'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Purchase = new Schema({
        item:{
            type: Schema.Types.ObjectId,
            ref: 'Item',
            required:true
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            
        },
        info:{
            name:String,
            phone:{type:String,required:true}
        },
        date: {
            type: Date,
            default: Date.now
        },
        finished:{
            type:Boolean,
            default:false
        }
});


module.exports = mongoose.model('Purchase', Purchase);