import moment from 'moment'

const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export default (date) => {
    return moment(date).lang("en").format('DD MMMM YYYY')
}
