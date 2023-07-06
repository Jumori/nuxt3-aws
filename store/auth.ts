interface AuthState {
  token: string | null
  tokenExpirationDate: Date | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    tokenExpirationDate: null
  }),

  getters: {
    isAuthenticated: state => !!state.token && !!state.tokenExpirationDate
  },

  actions: {
    setToken({ token, tokenExpirationDate }: AuthState) {
      this.token = token
      this.tokenExpirationDate = tokenExpirationDate
    }
  },

  persist: true
})
