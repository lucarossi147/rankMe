export const loginAction = () => {
    return {
        type : 'SIGN_IN'
    }
}

export const logoutAction = () => {
    return {
        type : 'SIGN_OUT'
    }
}

export const setAccessToken = (token) => {
    return {
        type : 'SET_ACCESS_TOKEN',
        token
    }
}

export const setRefreshToken = (token) => {
    return {
        type : 'SET_REFRESH_TOKEN',
        token
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

export const deleteTokens = () => {
    return {
        type: 'DELETE_TOKENS'
    }
}
