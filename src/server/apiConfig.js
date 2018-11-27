const isProduct = process.env.NODE_ENV == 'production'

export const hostUrl = isProduct?'':'http://192.168.3.78:3030'
