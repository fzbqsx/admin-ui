import {get} from "@/config/config"

export const ueserInfo = () => {
    return get('/user-client', {}
    )
}