import { jwtDecode } from "jwt-decode"
import storageHelper from "./storage.helper"

const tokenHelper = {
    decodeToken() {
        try {
            const access_token = storageHelper.loadItemStr('access_token')
            return jwtDecode(access_token)
        } catch {
            throw new Error('Failed to decode string token')
        }
    },

    getExpirationDateFromToken() {
        try {
            const decodedToken = this.decodeToken()
            return decodedToken['exp']
        } catch {
            throw new Error('Failed to get expiration date from token')
        }
    },

    isTokenExpired() {
        try {
            const expDate = this.getExpirationDateFromToken()
            const currentTime = Date.now() / 1000
            return currentTime >= expDate
        } catch {
            throw new Error('Failed to get expiration date')
        }
    }
}

export default tokenHelper