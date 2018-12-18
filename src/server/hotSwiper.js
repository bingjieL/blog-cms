import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/hotSwiper/delete`, params)
}

