// stores/counter.js
import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    token: null,
    name: null,
    email: null,
    rol: null,
  }),

  actions: {
    async setUserDetails(res) {
      this.$state.id = res.data.user.id
      this.$state.token = res.data.token
      this.$state.name = res.data.user.name
      this.$state.email = res.data.user.email
      this.$state.rol = res.data.user.rol
    },


    async fetchUser() {
      let res = await axios.get('http://127.0.0.1:8000/api/users/' + this.$state.id)

      this.$state.id = res.data.user.id
      this.$state.name = res.data.user.name
    },


    clearUser() {
      this.$state.id = null
      this.$state.token = null
      this.$state.name = null
      this.$state.email = null
      this.$state.rol = null
    }
  },
  persist: true
})
