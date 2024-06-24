import moment from "moment"

export const dateFormate = (date) => {
    return moment(date).format('DD MMM YYYY')
}