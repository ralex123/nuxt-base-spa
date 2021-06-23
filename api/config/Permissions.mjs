export let roles = {
  roleGuest: 'roleGuest',
  roleUser: 'roleUser',
  roleAdmin: 'roleAdmin',
}

export let tasks = {
  login: 'login',
  regUser: 'regUser',
  expGuest: 'expGuest',

  resetPassword: 'resetPassword',
  useService: 'useService',

  manageUsers: 'manageUsers',
  devExp: 'devExp',
}

let groups = {
  userTasks: [tasks.useService]
}

export let permissions = {

  roleGuest: {
    startPage: '/index',
    grants: [tasks.login, tasks.regUser, tasks.expGuest],
  },

  roleUser: {
    startPage: '/user',
    grants: [...groups.userTasks, tasks.login],
  },

  roleAdmin: {
    startPage: '/service',
    grants: [tasks.manageUsers, tasks.devExp, ...groups.userTasks, tasks.login],
  },
}


