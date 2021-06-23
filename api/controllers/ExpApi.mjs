import {Controller} from "../server/Controller.mjs";
import bcrypt from "bcrypt";
import os from "os";

export class ExpApi extends Controller {

  prop = 12


  /**
   * Для гостя
   * @type {{signature: string[], descript: string}}
   */
  async getExpGuest(a = 10, b = 20) {
    a = Number(a)
    b = Number(b)

    return {
      user: this.user,
      sum: a + b,
      host: os.hostname()
    }
  }


  /**
   * Для админа
   * @param name
   * @param a
   * @param b
   * @param flag
   * @returns {Promise<{flag, nullParam: null, name, sum: *, user: null}>}
   */
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


}
