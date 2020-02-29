/**
 * article的表结构
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    newstime:String,
    auth:{type:Schema.Types.ObjectId, ref:'User'},
    title:String,
    content:String,
    thumbnails:[String],
    viewcount:{type:Number,default:100},
    tags:[{type:Schema.Types.ObjectId, ref:'Tag'}],
    rateUsers:[{
        user:{type:Schema.Types.ObjectId, ref:'User'},
        date:String,
        score:Number
    }],
    isPublish:{type:Boolean, default:false}
});


