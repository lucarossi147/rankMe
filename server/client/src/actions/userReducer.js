const userReducer = (state = {}, action) => {
    switch (action.type){
        case 'SET_USER':
            state.user = action.user
            return state
        case 'DELETE_USER':
            state.user = {}
            return state
        default :
            return state
    }
}

export default userReducer
