import fs from 'fs/promises'

export default {


  getIdentity(username, password) {
    if (username === 'admin' && password === '123') {
      return {token: 'azaza', username: 'Admin'}
    }
  },


  /**
   * Вернуть список пользователей
   * @returns {Promise<any>}
   */
  async getUsers() {
    let str = await fs.readFile('../files/users.json', 'utf8')
    return JSON.parse(str)
  },

  /**
   * Создать пользователя
   * @param name
   * @param age
   * @param post
   * @returns {Promise<{size: number, newObject: {post, name, age}}>}
   */
  async createUser(name, age, post) {

    let newUser = {name, age, post}

    let str = await fs.readFile('users.json', 'utf8')
    let arr = JSON.parse(str)

    arr.push(newUser)

    await fs.writeFile('users.json', JSON.stringify(arr))

    let stats = await fs.stat('users.json')
    return {size : stats.size, newObject: newUser}
  },

}
