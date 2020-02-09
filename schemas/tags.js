/**
 * tags 表结构
 * */
import mongoose from 'mongoose'
var Schema = mongoose.Schema;

module.exports = new mongoose.Schema({
    tag:String,
    content:[{type:Schema.Types.ObjectId, ref:'Article'}]
});