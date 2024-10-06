import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)

const dateHelper =  {
    format(date, format = 'DD MMMM YYYY, HH:mm:ss') {
        if(!date || date === '') {
            return '-'
        }

        if(typeof(date) === 'string') {
            const timeZone = dayjs.tz.guess()
            return dayjs.utc(date).tz(timeZone).format(format)
        }

        return dayjs(date).format(format)
    }
}

export default dateHelper