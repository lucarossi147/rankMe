import {toast} from "react-toastify";

export const successNotify = (message) => toast.success(message)
export const errorNotify = (message) => toast.error(message)
export const infoNotify = (message) => toast.info(message)
export const warnNotify = (message) => toast.warn(message)
