import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  flag_active: {type: Boolean, default: true},
  ts_create: {type: Date, default: Date.now},
});

export const MonUser = mongoose.model('User', userSchema)




