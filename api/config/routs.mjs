import {tasks} from "./api.mjs";
import {ExpApi} from "../controllers/ExpApi.mjs";
import {UsersApi} from "../controllers/UsersApi.mjs";


export default {

  '/users/getUser': [UsersApi, tasks.login],
  '/users/getUserList': [UsersApi, tasks.manageUsers],
  '/users/cudUser': [UsersApi, tasks.manageUsers],

  '/exp/getExpGuest': [ExpApi, tasks.expGuest],
  '/exp/getExpAdmin': [ExpApi, tasks.devExp],

}
