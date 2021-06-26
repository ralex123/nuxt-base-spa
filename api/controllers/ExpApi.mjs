import {Controller} from "../server/Controller.mjs";
import bcrypt from "bcrypt";
import os from "os";
import mongodb from "mongodb";
import mongoose from "mongoose";

import {MonUser} from "../config/Models.mjs";

export class ExpApi extends Controller {

  prop = 12

  async getExpGuest(a = 10, b = 20) {
    a = Number(a)
    b = Number(b)

    return {
      user: this.user,
      sum: a + b,
      host: os.hostname()
    }
  }

  async getExpAdmin(name, a, b = 33, flag) {
    let hash = await bcrypt.hash(name, 10)
    let check = await bcrypt.compare(name, hash)
    ///return {hash, check}
    return {
      user: this.user,
      name: name,
      sum: a + b + this.prop,
      flag: flag,
      nullParam: null
    }
  }

  async getExpMongo() {

    let MongoClient = mongodb.MongoClient
    const uri = "mongodb+srv://mn_user:Nk5FZpWnhG8ZbqY@clusterexp.0xub4.mongodb.net/expdb?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
    const client = new MongoClient(uri)
    let dbName = 'expdb'

    await client.connect()
    console.log("Connected correctly to server")

    const db = client.db(dbName);
    const col = db.collection("collect");

    let resp = [];
    const myDoc = await col.find({series: '1234'}).toArray()

    return myDoc
  }

  /**
   * getExpMongoose
   * @returns {Promise<void>}
   */
  async getExpMongoose() {
    //const uri = "mongodb+srv://mn_user:Nk5FZpWnhG8ZbqY@clusterexp.0xub4.mongodb.net/expdb?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";

    // mongoose.connect('mongodb://mn_user:Nk5FZpWnhG8ZbqY@clusterexp.0xub4.mongodb.net/expdb',
    //   {useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true}
    // );
    //mongoose.connect(uri)

    //mongoose.Promise = global.Promise


    //await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

    //const db = mongoose.connection

    // db.on('error', console.error.bind(console, 'connection error:'))
    // db.once('open', () => {
    //   console.log("we're connected!")
    // })
    // console.log('ss')


    // const userSchema = new mongoose.Schema({
    //   name: String,
    //   age: Number,
    //   flag_block: Boolean,
    //   ts_create: Date,
    // });

    // NOTE: methods must be added to the schema before compiling it with mongoose.model()
    // kittySchema.methods.speak = function () {
    //   const greeting = this.name ? "Meow name is " + this.name : "I don't have a name"
    //   console.log(greeting)
    // }

    //const User = mongoose.model('User', userSchema)

    /// Создание
    //const fluffy = new Kitten({ name: 'fluffy', age: 4 })
    //await fluffy.save()

    //const user = new User({name: 'Valera', age: 13})
    //user.flag_block = false
    //await user.save()


    /// Изменение
    //let user = await User.findById('60d78cc70c514704a499f498')
    //user.flag_block_azaza = true
    //await user.save()

    // let user = new MonUser()
    // user.name = 'Pasha'
    // user.age = 22
    // await user.save()

    //return user
    return MonUser.find()

    // try {
    //
    //   mongoose.Promise = global.Promise
    //
    //   await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("connected"))
    //
    //   const db = mongoose.connection
    //
    //   db.on('error', console.error.bind(console, 'connection error:'))
    //
    //   db.once('open', () => {
    //     return "we're connected!"
    //   })
    //
    // } catch (error) {
    //   console.log("could not connect");
    // }


  }


}
