import {get,post} from "@/config/config"
import qs from 'qs'

export const queryArticle = params => get(
    `/art?${qs.stringify(params)}`
)