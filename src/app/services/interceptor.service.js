import tokenHelper from "app/helpers/token.helper"
import storageHelper from "app/helpers/storage.helper"

const interceptorSvc = {
    async requestInterceptor(config) {
        if(config.url.includes('/refresh')) {
            const refreshToken = storageHelper.loadItemStr('refresh_token')
            config.headers['Authorization'] = `Bearer ${refreshToken}`
        }

        // if(config.url !== '/auth/login' && config.url !== '/auth/refresh-token') {
        //     let accessToken = storageHelper.loadItemStr('access_token')

        //     if(tokenHelper.isTokenExpired()) {
        //         const newToken = await authApi.refresh()
        //         accessToken = newToken.access_token
        //     }

        //     if(accessToken) {
        //         config.headers['Authorization'] = `Bearer ${accessToken}`
        //     }
        // }

        return config
    },

    errorRequestInterceptor(config) {
        return config
    },

    responseInterceptor(response) {
        saveUserLoginInfo(response)
        saveUserToken(response)
        return response.data
    },

    errorResponseInterceptor(error) {
        const { config } = error
        if(config.url === '/auth/refresh-token') {
            storageHelper.clearItems()
            window.location.reload()
        }
        return error.response
    }
}

export default interceptorSvc

function saveUserToken(response) {
    const { config, data, status } = response

    if(config.url.includes('/refresh') && status === 200) {
        const {access_token, refresh_token} = data.data

        storageHelper.saveItemStr('access_token', access_token)
        storageHelper.saveItemStr('refresh_token', refresh_token)
        
        const expDate = tokenHelper.getExpirationDateFromToken()
        storageHelper.saveItemStr('access_expired', expDate)
    }
}

function saveUserLoginInfo(response) {
    const { config, data, status } = response

    if(config.url.includes('/login') && status === 200) {
        const {access_token, refresh_token, ...userData} = data.data

        storageHelper.saveItemStr('access_token', access_token)
        storageHelper.saveItemStr('refresh_token', refresh_token)
        storageHelper.saveItem('user', userData)

        const expDate = tokenHelper.getExpirationDateFromToken()
        storageHelper.saveItemStr('access_expired', expDate)

    }
}