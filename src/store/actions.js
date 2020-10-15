/*
    包含多个间接（异步）更新state的方法    对象模块
 */

import {AUTH_TOKEN} from "@/store/mutation-type";
import {login} from "../views/loginOrRegister/js/LoginOrRegister"


export default {
    [AUTH_TOKEN]({commit},params){
        const api = (data) => {
            return new Promise(((resolve) => {
                login(data).then(res =>{
                    if(200 === res.status) {
                        if ("ok" === res.data.err) {
                            commit(AUTH_TOKEN, res.data.data.token)
                        }
                    }
                    resolve(res)
                })
            }))
        }
        return api(params)
    }
}