export const alertConstants = {
    SUCCESS: 'ALERT_SUCCESS',
    ERROR: 'ALERT_ERROR',
    CLEAR: 'ALERT_CLEAR'
};

export const alerts = {
    success,
    error,
    clear
}

function success(message) {
    return {
        type : alertConstants.SUCCESS, message
    }
}

function error(message) {
    return {
        type: alertConstants.ERROR, message
    }
}

function clear(){
    return {
        type: alertConstants.ERROR
    }
}