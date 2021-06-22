let config = {}

config.mode = (process.env.NODE_ENV === 'development') ?
  'dev' : 'prod'

config.baseAxiosPrefixUrl = (config.mode === 'dev') ?
  'http://localhost:3333/' : 'https://api_taskcmd.ru/'

config.baseSnackbar = {
  timeout: 20000,
  infoColor: 'orange darken-4',
  devColor: 'black',
}


///////////////////////////////////////////////////


/**
 * Параметры ролей
 */
config.roles = {
  'roleUser': {
    startPage: '/user-page'
  },
  'roleAdmin': {
    startPage: '/admin/users'
  },
}

// config.appbar = [
//   {
//     section: 'Производство', pages: [
//       pages.prodCut1,
//       pages.prodCut2,
//       pages.prodOrders,
//     ]
//   },
//   {
//     section: 'Exp', pages: [
//       pages.expCouchDb1,
//       pages.expCouchDb2,
//     ]
//   },
// ]

////////////////

// /**
//  * Конфиг компонента snackbar-ex
//  * @type {{debug: {timeout: number}, user: {timeout: number}}}
//  */
// config.snackbar = {
//   user: {
//     timeout: 20000
//   },
//   debug: {
//     timeout: 0
//   }
// }
//
// /**
//  * Конфиг проекта
//  */
// config.app = {
//   name: 'textile-v3',
//   BAR: {
//     brand: '大和魂',
//     pages: []
//   }
// }

export default config
