import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  flag_block: Boolean,
  ts_create: Date,
});

export const MonUser = mongoose.model('User', userSchema)




