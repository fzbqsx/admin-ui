import axios from 'axios'
import qs from 'qs';
const globalenv = process.env.NODE_ENV

const prepareAxios = axios.create({
    globalenv,
    lang: 'zh-zn',
    baseURL: globalenv === 'production'
        ? `${window.location.protocol}//${window.location.hostname}/auth/api` : 'http://47.114.6.125/auth/api',
    timeout:3000
})

export function login (params) {
    if (params.phone != "") {
        return prepareAxios.post('/oauth/sms', params, {
            headers:{
                'Content-Type': 'application/json'
            }
        });
    }else{
        return prepareAxios.post('/login', params);
    }
}


export function logout (params) {
    return  prepareAxios.post('/logout',params,{
        headers:{
            'Authorization': 'Bearar '+localStorage.getItem('X-AUTH-TOKEN')
        }
    });
}

export function getCaptchas (params) {
    prepareAxios.post(`/oauth/sms-code?${qs.stringify(params)}`);
}


