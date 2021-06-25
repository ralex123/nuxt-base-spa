import os from 'os';

const PORT = 15012
const ENV_DEV = (os.hostname() === 'lenovo-apc')

const tasks = {
  login: 'login',
  regUser: 'regUser',
  expGuest: 'expGuest',

  resetPassword: 'resetPassword',
  useService: 'useService',

  manageUsers: 'manageUsers',
  devExp: 'devExp',
}

const groups = {
  userTasks: [tasks.useService]
}

const roles = {

  'roleGuest': {
    permissions: [tasks.login, tasks.regUser, tasks.expGuest],
  },

  'roleUser': {
    permissions: [...groups.userTasks, tasks.login],
  },

  'roleAdmin': {
    permissions: [tasks.manageUsers, tasks.devExp, ...groups.userTasks, tasks.login],
  },
}

const databases = {
  mariaDb: {
    host: 'localhost',
    port: (ENV_DEV) ? 3309 : 3306,
    database: 'baseapp',
    user: (ENV_DEV) ? 'root' : 'dbuser',
    password: (ENV_DEV) ? 'root' : 'mariapass',
    connectionLimit: 5
  },
  mongoDb: {
    full : "mongodb+srv://mn_user:Nk5FZpWnhG8ZbqY@clusterexp.0xub4.mongodb.net/expdb?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true"
  }
}

export {PORT, ENV_DEV, tasks, roles, databases}