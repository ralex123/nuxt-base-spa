// import config from '~/config/config'

export const state = function () {
  return {
    flagShow: false,
    message: null,
    type: null // dev - сообщения DEV, info - для юзеров
  }
}

export const mutations = {

  show(state, value) {
    state.flagShow = true
    state.message = value.message
    state.type = value.type
  },

  hide(state) {
    state.flagShow = false
    state.message = ''
  },
}

export const actions = {}
