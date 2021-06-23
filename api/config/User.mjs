import {maria} from "../server/MariaDb.mjs";
import BaseUser from "../server/BaseUser.mjs";

export default class User extends BaseUser {

  async setIdentityByToken(token) {

    if (!token) {
      this.setAsGuest()
    } else {

      let user = await maria.singleQueryOne(`SELECT * FROM app_users WHERE token = "${token}"`)

      if (user) {
        this.id = user.id
        this.login = user.login
        this.name = user.name
        this.role = user.role
        this.data = {}
      } else {
        this.setAsGuest()
      }
    }


  }

}
