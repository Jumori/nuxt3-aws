interface EnvState {
  env: string
  apiURL: string
}

export const useEnvStore = defineStore('env', {
  state: (): EnvState => ({
    env: '',
    apiURL: ''
  }),

  getters: {
    isLoaded: state => state.env !== '' && state.apiURL !== ''
  },

  actions: {
    setEnv({ env, apiURL }: EnvState) {
      this.env = env
      this.apiURL = apiURL
    }
  }
})
