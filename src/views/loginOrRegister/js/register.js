import {post} from '@/config/config'

export const userRegister = (params) => post(
    '/user-client',
    params
)