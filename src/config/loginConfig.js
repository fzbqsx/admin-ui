import axios from 'axios'

const loginEnv = process.env.NODE_ENV

const prepareAxios = axios.create({
    loginEnv,
    lang: 'zh-zn',
    baseURL: loginEnv === 'production'
        ? `${window.location.protocol}//${window.location.hostname}/auth/api` : 'http://47.114.6.125/auth/api',
    timeout:3000
})

export default prepareAxios
