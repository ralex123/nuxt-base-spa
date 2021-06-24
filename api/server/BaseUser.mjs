import {roles} from "../config/api.mjs";

export default class BaseUser {

  id = null
  login = null
  name = null
  role = null
  data = null

  async setIdentityByToken() {
    // Метод переопределяется в конфиге приложения
  }

  setAsGuest() {
    this.name = 'Guest'
    this.role = 'roleGuest'
  }

  can (task) {
    let permissions = roles[this.role]?.permissions
    if (permissions) {
      return (permissions.indexOf(task) !== -1)
    } else {
      throw new Error('Нет описания для роли ' + this.role)
    }
  }


}
