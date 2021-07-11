export const loginAction = () => {
    return {
        type : 'SIGN_IN'
    }
}

export const logoutAction = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const setMatch = (users) => {
    return {
        type : 'SET_MATCH',
        users
    }
}

export const deleteMatch = () => {
    return {
        type: 'DELETE_MATCH'
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user
    }
}

export const deleteUser = () => {
    return {
        type: 'DELETE_USER'
    }
}
