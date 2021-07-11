const matchReducer = (state = {}, action) => {
    switch (action.type){
        case 'SET_MATCH':
            state = { user1 : action.users.user1, user2: action.users.user2}
            return state
        case 'DELETE_MATCH':
            state = {}
            return state
        default :
            return state
    }
}

export default matchReducer
