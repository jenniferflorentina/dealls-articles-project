import axios from "axios"
import interceptorSvc from "./interceptor.service"

const requestSvc = axios.create({
    baseURL: process.env.REACT_APP_API_BASE
})

requestSvc.interceptors.request.use(
    interceptorSvc.requestInterceptor,
    interceptorSvc.errorRequestInterceptor
)

requestSvc.interceptors.response.use(
    interceptorSvc.responseInterceptor,
    interceptorSvc.errorResponseInterceptor
)

export default requestSvc