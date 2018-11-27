import router from '@/router'

const login = {
    state: {
        userName: '~~ 未发现小主.'
    },
    mutations: {
        setBasicInfo(state, payload) {
            state.userName = payload.userName
            return state
        }
    },
    actions: {

    }
  }
  
  export default login;