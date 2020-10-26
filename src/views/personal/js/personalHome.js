import {get} from '@/config/config'

export const querySysNotify = params => get(
    '/sys-notify',
    params
)

export const queryQs = params => get(
    '/faq',
    params
)

export const queryStatisticData = params => get(
    '/trans-history/stat',
    params
)