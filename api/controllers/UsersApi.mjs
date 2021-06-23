import {Controller} from "../server/Controller.mjs";
import {SnackbarMessage} from "../server/Errors.mjs";
import {maria} from "../server/MariaDb.mjs";
import bcrypt from "bcrypt";
import crypto from "crypto"


export class UsersApi extends Controller {


  static getIdentity = {
    descript: 'Вернуть пользователя по логину/паролю',
    signature: ['getIdentity', 'S:Логин', 'S:Пароль'],
  }

  async getIdentity(username, password) {
    let user = await maria.singleQueryOne("SELECT * FROM app_users WHERE login = ?", [username])
    if (user) {
      if (await bcrypt.compare(password, user.hash)) {
        return user
      }
    }
    throw new SnackbarMessage('Неверный логин или пароль')
  }


  static getUserList = {
    descript: 'Вернуть список пользователей',
    signature: ['getUserList'],
  }

  async getUserList() {
    return maria.singleQuery('SELECT id, ts_create, login, name, role, flag_block FROM app_users')
  }

  ///////
  static cudUser = {
    descript: 'Создать/обновить/удалить пользователя',
    signature: ['cudUser', 'N:id', 'S:login', 'S:name', 'S:role', 'N:flag_block', 'S:password'],
  }

  async cudUser(id, login, name, role, flag_block, password = null) {

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
      await maria.singleQuery([login, name, role, hash, token])
    }
  }


  static cudUser2 = {
    descript: 'Создать/обновить/удалить пользователя',
    signature: ['cudUser2', 'N:id', 'S:login', 'S:name', 'S:role', 'N:flag_block', 'S:password'],
    params: {id: 'N', login_tt: 'S>5'}
  }

  async cudUser2(id, login, name, role, flag_block, password = null) {

  }


}
