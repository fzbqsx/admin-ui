/*
    封装axios
 */
import axios from 'axios'

const env = process.env.NOD_ENV
export const ENV = {
    env,
    lang: 'zh-zn',
    baseURL: env === 'production'
        ? `${window.location.protocol}//${window.location.hostname}/boneco/api` : 'http://47.114.6.125/boneco/api'
}
axios.defaults.baseURL = ENV.baseURL

//设置请求超时
axios.defaults.timeout = 30000;

//post请求头设置 ;charset=UTF-8
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(
    config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = `Bearar ${token}`);
        return config;
    },
    error => {
        console.log("=====request===========")
        console.log(error)
        return Promise.resolve(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    response => {
        console.log("==========response==========")
        console.log(response)
        return response.status
    },
    error => {
        console.log("==========error==========")
        console.log(error)
        const msg = error.Message !== undefined ? error.Message : ''

        return Promise.reject(error)
    }
);

/*
    get方法，对应get请求
    @param {String} url [请求的url地址]
    @param {Object} params [请求时携带的参数]
 */
export function get(url,params) {
    return new Promise((resolve, reject) => {
        axios.get(url,{
            params
        }).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
};

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
                // if(res !== undefined){
                //     resolve(res.data);
                // }else{
                //     reject(res)
                // }
            })
        .catch(err => {
            reject(err.data)
        })
    });
};

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
};



