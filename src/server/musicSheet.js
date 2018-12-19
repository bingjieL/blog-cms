import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/sheet/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/sheet/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/sheet/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/sheet/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/sheet/delete`, params)
}