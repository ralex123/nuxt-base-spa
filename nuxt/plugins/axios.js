import Vue from 'vue'
import config from '../app.config'

export default (context, inject) => {

  /// Префикс URL
  context.$axios.defaults.baseURL = config.baseAxiosPrefixUrl

  /// Заголовок авторизации
  context.$axios.interceptors.request.use((config) => {
    let user = JSON.parse(localStorage.getItem('user'))
    let token = user?.accessToken
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
        let data
        if (status === 'error201') {
          // Пользовательская ошибка-сообщение
          data = {
            type: 'info',
            message: response.data.meta.message
          }
        } else {
          // Прочие ошибки
          data = {
            type: 'dev',
            message: 'Status: ' + status + '<br>' + response.data.meta.message,
          }
        }
        // this.$store.commit('baseSnackbar/show', {type: 'dev', message: 'dddd' })
        context.store.commit('baseSnackbar/show', data)

      } catch (err) {
        context.store.commit('baseSnackbar/show', {
          type: 'info', message: 'Неизвестный формат ответа'
        })
      }

    }

    return response

  })

}
