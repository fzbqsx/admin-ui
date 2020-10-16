/*
    封装axios
 */
import axios from 'axios'
import store from '@/store/index'
import {Message} from 'view-design';
import router from "@/router";

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
        return Promise.resolve(error);
    }
);

//响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    Message.error ('请求错误')
                    break

                case 401:
                    Message.error  ('未授权，请登录')
                    router.replace({path: '/Login'});
                    break

                case 403:
                    Message.error  ('拒绝访问')
                    break

                case 404:
                    Message.error  (`请求地址出错: ${err.response.config.url}`)
                    break

                case 408:
                    Message.error  ('请求超时')
                    break

                case 500:
                    Message.error  ('服务器内部错误')
                    break

                case 501:
                    Message.error  ('服务未实现')
                    break

                case 502:
                    Message.error  ('网关错误')
                    break

                case 503:
                    Message.error  ('服务不可用')
                    break

                case 504:
                    Message.error  ('网关超时')
                    break

                case 505:
                    Message.error  ('HTTP版本不受支持')
                    break
            }
        }

        //return error.response
        return Promise.reject(error.response)
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



