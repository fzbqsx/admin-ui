import {get } from '@/config/config'
import qs from 'qs';

export const queryAllPresent = params => get(
    '/present/',
    params
)

export const querySort = params => get(
    `/present?${qs.stringify(params)}`,
    null
)