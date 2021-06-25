import config from "../config/spa";

export default async function ({ app, store, route, $axios, redirect }) {

  /// Авторизация роли для страницы
  /// Если доступ запрещен - перебрасывать на стартовую страницу для роли
  let path = route.path
  let role = store.state.baseAuth.role
  if (config.roles[role].permissions.indexOf(path) === -1) {
    redirect(config.roles[role].startPage)
  }


  ///


  //console.log(route.name)
  //console.log(route.path)

  //redirect('/dashboard')

  // alert('mw-auth')

  // if (localStorage.getItem('user')) {
  //   let user = JSON.parse(localStorage.getItem('user'))
  //   store.commit('base/setUser', user)
  // } else {
  //   let user = {
  //     name: 'Guest',
  //     role: 'roleGuest',
  //     subRole: '',
  //     params: {},
  //     accessToken: '',
  //     timeout: 0
  //   }
  //   store.commit('base/setUser', user)
  // }
}
