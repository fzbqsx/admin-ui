/*
    多个可以直接同步更新状态的方法  对象模块
 */
import {AUTH_TOKEN,AUTH_SESSION} from "@/store/mutation-type";
import {TOKEN_KEY,SESSION_KEY} from "@/global"

export default {
    [AUTH_TOKEN](state,params) {
        state.token = params;
        localStorage.setItem(TOKEN_KEY,params);
    },
    [AUTH_SESSION](state,params){
      state.session = JSON.stringify(params);
      sessionStorage.setItem(SESSION_KEY,JSON.stringify(params))
    }

}