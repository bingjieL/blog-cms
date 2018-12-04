import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/delete`, params)
}