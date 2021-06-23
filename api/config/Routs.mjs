import {tasks} from "./Permissions.mjs";
import {ExpClassApi} from "../controllers/ExpClassApi.mjs";
import {UsersApi} from "../controllers/UsersApi.mjs";


export default {


  '/users/login': [UsersApi, UsersApi.getIdentity, tasks.login],

  '/users/getUserList': [UsersApi, UsersApi.getUserList, tasks.manageUsers],
  '/users/cudUser': [UsersApi, UsersApi.cudUser, tasks.manageUsers],
  '/admin/exp/getGuest': [ExpClassApi, ExpClassApi.getExpGuest, tasks.expGuest],


  '/admin/exp/getExp': [ExpClassApi, ExpClassApi.getExpAzaza, tasks.devExp],


  //admin_expClass_getExp: [new ExpClassApi().getExp, tasks.devExp]

}
