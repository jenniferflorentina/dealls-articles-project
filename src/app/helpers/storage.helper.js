const storageHelper = {
    loadItem(key = '') {
        try {
            const storgaeData = localStorage.getItem(`strories_${key}`)
            return JSON.parse(storgaeData)
        } catch {
            throw new Error('Failed to load object form local storgae')
        }
    },

    loadItemStr(key = '') {
        try {
            return localStorage.getItem(`strories_${key}`)
        } catch {
            throw new Error('Failed to string object form local storgae')
        }
    },

    saveItem(key = 'key', obj = {}) {
        try {
            localStorage.setItem(`strories_${key}`, JSON.stringify(obj))
        } catch {
            throw new Error('Failed to save object to local storgae')
        }
    },

    saveItemStr(key = 'key', str = '') {
        try {
            localStorage.setItem(`strories_${key}`, str)
        } catch {
            throw new Error('Falied to save string to local storage')
        }
    },

    clearItems() {
        localStorage.clear()
    }
}

export default storageHelper