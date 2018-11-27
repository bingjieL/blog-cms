import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const LoginApi = (params) => {
    return request.post(`${hostUrl}/api/users/login`, params)
}