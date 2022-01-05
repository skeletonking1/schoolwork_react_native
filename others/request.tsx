// https://www.react-native.cn/docs/network

import axios from "axios"

axios.defaults.baseURL = "";

const Request = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 30 * 1000
})
// request interceptor
Request.interceptors.request.use(
    config => {
        // const token  = '???'
        // if (token)  config.headers.Authorization = 'Bearer ' + token
        return config
    },
    err => Promise.reject(err)
)

/**
 * post request
 * @param <string> Request url
 * @param <object> Request parameters
 * @param <promise>
 * */
export const post = (url: string, data: any, config = {}) => {
    return Request.post(url, data, { ...config })
}

/**
 * get request
 * @param <string> Request url
 * @param <object> Request parameters
 * @param <promise>
 * */
export const get = (url: string, data: any, config = {}) => {
    return Request.get(url, { params: data, ...config })
}


export default Request