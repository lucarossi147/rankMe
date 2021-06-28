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
