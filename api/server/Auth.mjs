import {permissions, roles, tasks} from "../config/Permissions.mjs";
import User from "../config/User.mjs";


export let Auth = {


  /**
   * Проверить целостность данных в файле Permissions
   */
  checkPermission() {
    for (let prop in roles) {
      if (prop !== roles[prop]) throw Error(`Ошибка в Permissions.roles: ${prop} !== ${roles[prop]}`)
    }
    for (let prop in tasks) {
      if (prop !== tasks[prop]) throw Error(`Ошибка в Permissions.tasks: ${prop} !== ${tasks[prop]}`)
    }
  },

  /**
   * Проверить разрешение для роли на выполнение задачи
   * @param role
   * @param task
   * @returns {boolean}
   */
  can(role, task) {
    let objRole = permissions[role]
    if (objRole) {
      return (objRole.grants.indexOf(task) !== -1)
    } else {
      throw new Error('Не существует роли ' + role)
    }
  }

}


