import request from '@/server/request'
import { hostUrl } from '@/server/apiConfig'

export const GetBlogTypeApi = (params) => {
    return request.post(`${hostUrl}/api/blogType/get`, params)
}

export const AddApi = (params) => {
    return request.post(`${hostUrl}/api/blog/add`, params)
}

export const GetApi = (params) => {
    return request.post(`${hostUrl}/api/blog/get`, params)
}

export const UpdateApi = (params) => {
    return request.post(`${hostUrl}/api/blog/update`, params)
}

export const FindByIdApi = (params) => {
    return request.post(`${hostUrl}/api/blog/getById`, params)
}

export const DeleteApi = (params) => {
    return request.post(`${hostUrl}/api/blog/delete`, params)
}