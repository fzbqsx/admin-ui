/*
    多个可以直接同步更新状态的方法  对象模块
 */
import {AUTH_TOKEN} from "@/store/mutation-type";
import {SESSION_KEY} from "../global"

export default {
    [AUTH_TOKEN](state,params) {
        state.token = params;
        localStorage.setItem(SESSION_KEY,params);
    }




}