import config from '../config/spa'

export default (context, inject) => {

  // alert('base-plugin')

  /// Записать инфу о юзере в стор
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    context.store.commit('baseAuth/setUser', user)
  }

  /// Префикс URL
  context.$axios.defaults.baseURL = config.baseAxiosPrefixUrl

  /// Заголовок авторизации
  context.$axios.interceptors.request.use((config) => {
    let token = context.store.state.baseAuth.token
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  /// Обработка ответа
  context.$axios.interceptors.response.use((response) => {

    let status = response.data?.status

    // Обработка ошибочного ответа
    if (status !== 'success') {
      try {
        let data = {}
        if (status === 'error201') {
          // Пользовательская ошибка-сообщение
          data = {type: 'info', message: response.data.meta.message}
        } else {
          // Прочие ошибки
          let msg = 'Status: ' + status + '<br>' + response.data.meta.message
          data = {type: 'dev', message: msg}
        }
        context.store.commit('baseSnackbar/show', data)
      } catch (err) {
        context.store.commit('baseSnackbar/show', {type: 'info', message: 'Неизвестный формат ответа'})
      }
    }

    return response
  })

}
