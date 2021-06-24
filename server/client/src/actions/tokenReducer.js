const initalState = {
    accessToken: '',
    refreshToken: ''
}

const tokenReducer = (state = initalState, action) => {
    switch (action.type){
        case 'SET_ACCESS_TOKEN':
            state.accessToken = action.token
            return state
        case 'SET_REFRESH_TOKEN':
            state.refreshToken = action.token
            return state.refreshToken
        case 'DELETE_TOKENS':
            state.accessToken = ''
            state.refreshToken = ''
            return state
        default:
            return state
    }
}

export default tokenReducer
