import {maria} from "../server/MariaDb.mjs";
import UserInterface from "../server/UserInterface.mjs";

export default class User extends UserInterface {

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
