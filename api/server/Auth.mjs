import {permissions, roles, tasks} from "../config/Permissions.mjs";
import User from "../config/User.mjs";


export let Auth = {


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


