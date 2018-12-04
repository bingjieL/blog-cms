import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/music/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/music/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/music/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/music/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/music/delete`, params)
}