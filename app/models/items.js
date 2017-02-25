'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Item = new Schema({

    isAvailiable:{
        type:Boolean,
        default:true
    },
    img:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    oldPrice:{
        type:Number,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
        
    },
    created: {
        type: Date,
        default: Date.now
    },
    tags:[String],
    description:{
        type:String,
        default:`Picked fresh from the farm to offer your special recipient a bouquet that 
        brings brilliant color to any of life's special occasions, our Long Stemmed Mixed Rose Bouquet will
        delight your special recipient with each fragrant bloom. Hand gathered in select floral farms
        and boasting an array. `
    }
});
Item.index({ name: 'text',tags: 'text',_id:'text' });
Item.virtual('href').get(function(){
    return process.env.APP_URL+"item/"+this._id
})
Item.pre('save', function(next) {
  



  if(this.tags.length==1)
    this.tags=this.tags[0].replace(/, ?/g,',').split(",");
    if(this.oldPrice){
        this.tags.push("sale");
    }
    else{
        if(this.tags.indexOf("sale")!=-1)
            this.tags.splice( this.tags.indexOf("sale"), 1 );
    }
   // console.log(this.tags);
 
  next();
});


module.exports = mongoose.model('Item', Item);