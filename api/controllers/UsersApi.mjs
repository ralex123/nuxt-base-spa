import {Controller} from "../server/Controller.mjs"
import {SnackbarMessage} from "../server/Errors.mjs"
import {maria} from "../server/MariaDb.mjs"
import bcrypt from "bcrypt"
import crypto from "crypto"


export class UsersApi extends Controller {


  /**
   * Вернуть объект пользователя по логину/паролю
   * @param username
   * @param password
   * @returns {Promise<*>}
   */
  async getUser(username, password) {
    let user = await maria.singleQueryOne("SELECT * FROM app_users WHERE login = ?", [username])
    if (user) {
      if (await bcrypt.compare(password, user.hash)) {
        return user
      }
    }
    throw new SnackbarMessage('Неверный логин или пароль')
  }


  /**
   * Вернуть список всех пользователей
   * @returns {Promise<*>}
   */
  async getUserList() {
    return maria.singleQuery('SELECT id, ts_create, login, name, role, flag_block FROM app_users')
  }


  /**
   * Создать/обновить пользователя
   * @param id
   * @param login
   * @param name
   * @param role
   * @param flag_block
   * @param password
   * @returns {Promise<void>}
   */
  async cudUser(id, login, name, role, flag_block, password = null) {

    id = Number(id)
    flag_block = Number(flag_block)

    if (id > 0) {
      // Редактирование пользователя

      let hash = null
      if (password && password !== 'null') hash = await bcrypt.hash(password, 10)

      if (hash) {
        let sql = "UPDATE app_users SET login=?, name=?, role=?, flag_block=?, hash=? WHERE id=?";
        await maria.singleQuery(sql, [login, name, role, flag_block, hash, id])
      } else {
        let sql = "UPDATE app_users SET login=?, name=?, role=?, flag_block=? WHERE id=?";
        await maria.singleQuery(sql, [login, name, role, flag_block, id])
      }

    } else {
      // Создание пользователя
      let hash = await bcrypt.hash(password, 10)
      let token = crypto.randomBytes(16).toString('hex')

      let sql = "INSERT INTO app_users (login, name, role, hash, token) VALUES (?, ?, ?, ?, ?)"
      await maria.singleQuery(sql, [login, name, role, hash, token])
    }
  }


}
