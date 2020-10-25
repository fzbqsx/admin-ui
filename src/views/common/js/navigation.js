import {get,post} from "@/config/config"
import qs from 'qs'

export const querySysConfig = params => get(
    '/sys-cfg/public/'+params.sysName+`?${qs.stringify(params.query)}`
)