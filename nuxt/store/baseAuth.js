export const state = function () {
  return {
    name: 'Guest',
    role: 'roleGuest',
    token: '',
    data: {},
  }
}

export const mutations = {

  setUser(state, user) {
    state.name = user?.name
    state.role = user?.role
    state.token = user?.token
    state.data = user?.data
    localStorage.setItem('user', JSON.stringify(state))
  },

  logOut(state) {
    state.name = 'Guest'
    state.role = 'roleGuest'
    state.token = 'roleGuest'
    state.data = {}
    localStorage.setItem('user', JSON.stringify(state))
  },

}

export const actions = {

}
