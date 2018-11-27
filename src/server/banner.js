import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/banner/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/banner/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/banner/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/banner/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/banner/delete`, params)
}