let config = {}

config.mode = (process.env.NODE_ENV === 'development') ?
  'dev' : 'prod'

config.baseAxiosPrefixUrl = (config.mode === 'dev') ?
  'http://localhost:15012/' : 'https://jsjs.artnetix.com/_api_/'

config.baseSnackbar = {
  timeout: 20000,
  infoColor: 'orange darken-4',
  devColor: 'black',
}


// Страницы приложения
const pageIndex = '/'
const page404 = '/404.html'
const pageRegister = '/register'
const pageUser = '/user-page'
const pageManageUsers = '/admin/users'
const pageExpPage = '/admin/exp-page'

const gpUser = [page404, pageIndex, pageRegister]


/**
 * Параметры ролей
 */
config.roles = {
  'roleGuest': {
    startPage: pageIndex,
    permissions: [...gpUser],
  },
  'roleUser': {
    startPage: pageUser,
    permissions: [...gpUser, pageUser],
  },
  'roleAdmin': {
    startPage: pageManageUsers,
    permissions: [...gpUser, pageUser, pageManageUsers, pageExpPage]
  },
}

export default config
