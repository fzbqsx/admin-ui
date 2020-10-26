import {get} from '@/config/config'

export const queryPriceList = params => get(
    '/express/price',
    params
)