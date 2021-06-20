export const state = function () {
  return {
    name: 'Guest',
    role: 'roleGuest',
    token: '',
  }
}

export const mutations = {

  setUser(state, user) {
    state.name = user?.name
    state.role = user?.role
    state.token = user?.token


    localStorage.setItem('user', JSON.stringify(state))
  },

}

export const actions = {

}
