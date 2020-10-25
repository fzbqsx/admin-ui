/*
    服务于state
 */

import {AUTH_TOKEN,AUTH_SESSION} from "./mutation-type";
export default {
    [AUTH_TOKEN]: state => state.token,
    [AUTH_SESSION]: state => state.session
}