import {Controller} from "../server/Controller.mjs";
import bcrypt from "bcrypt";
import os from "os";

export class ExpClassApi extends Controller {

  prop = 12

  static getExpAzaza = {
    descript: 'Чото полезное делает конечно',
    signature: ['getExpAzaza', 'S:Имя', 'N:Число один', 'N:Число два', 'B:Флаг такой-то'],
  }

  async getExpAzaza(name, a, b = 33, flag) {

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

  // http://localhost:15012/admin/exp/getGuest?a=1&b=2
  static getExpGuest = {
    descript: 'Чото полезное делает конечно',
    signature: ['getExpGuest', 'N:', 'N:'],
  }

  async getExpGuest(a=10, b=20) {
    return {
      user: this.user,
      sum: a + b,
      host: os.hostname()
    }
  }



}
