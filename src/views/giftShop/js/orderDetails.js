import {get, post, deletefn} from '@/config/config'
import qs from 'qs';

export const queryDepot = params => get(
    '/depot',
    params
)

export const queryExpress = params => get(
    '/depot/' + params.id + '/express',
)

export const queryPresent = params => get(
    '/depot/' + params.depotId + '/present',
)

export const queryProvince = params => get(
    '/region/province',
    params
)

export const queryCity = params => get(
    '/region/province/' + params.provinceId
)

export const queryDistrict = params => get(
    '/region/city/' + params.cityId
)

export const addShipper = (params, body) => post(
    '/shipper',
    body,
    {
        data: body,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)

export const querShipper = params => get(
    '/shipper/',
    params
)

export const defaultShipper = (params) => post(
    '/shipper/' + params.shipperId,
)

export const deleteShipper = params => deletefn(
    '/shipper/' + params.shipperId
)

export const queryAllPresent = params => get(
    '/present/',
    params
)

export const createOrder = params => post(
    '/unified-order',
    params
)