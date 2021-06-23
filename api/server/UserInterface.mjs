export default class UserInterface {

  id = null
  login = null
  name = null
  role = null
  data = null

  async setIdentityByToken() {

  }

  setAsGuest() {
    this.name = 'Guest'
    this.role = 'roleGuest'
  }

}
