const userReducer = (state = {}, action) => {
    switch (action.type){
        case 'SET_USER':
            state = action.user
            return state
        case 'DELETE_USER':
            state = {}
            return state
        default :
            return state
    }
}

export default userReducer
