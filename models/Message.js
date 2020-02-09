import mongoose from 'mongoose'
import messageSchema from '../schemas/messages'

module.exports = mongoose.model('Message',messageSchema);