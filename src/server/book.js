import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/book/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/book/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/book/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/book/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/book/delete`, params)
}