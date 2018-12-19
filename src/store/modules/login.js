import router from '@/router'
const defaultUserName = '~~ 未发现小主.'
const login = {
    state: {
        userName: defaultUserName
    },
    mutations: {
        setBasicInfo(state, payload) {
            state.userName = `${payload.userName} . 小主`
            return state
        },
        clearBasicInfo(state) {
            state.userName = defaultUserName
            return state
        }
    },
    actions: {

    }
  }
  
  export default login;