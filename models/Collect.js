import mongoose from 'mongoose'
import collectSchema from '../schemas/collects'

module.exports = mongoose.model('Collect',collectSchema);