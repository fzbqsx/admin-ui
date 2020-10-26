import {get} from '@/config/config'

export const queryOrder = params => get(
    '/order',
    params
)

export const queryOrderDetails = params => get(
    '/order/biz/'+params.tradeNo
)