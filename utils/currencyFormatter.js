const currencyCode = ""
const currencyPosition = "left"
const maxFractionDigits = 2
const decimalSeparator = ","
const thousandSeparator = "."

export default {

    position(currencyPosition, value) {
        return currencyPosition === "left"
            ? `${currencyCode}${value}`
            : `${value}${currencyCode}`
    },
    CurrencyFormatter(value, isWallet=false) {
        var string = "string"
        var result

        if (
            value === 0 ||
        value === null ||
        value === undefined ||
        value === "0" ||
        typeof value === string
        ) {
            return this.position(currencyPosition, "0")
        }

        let currencyCheck = currencyCode.replace(/\s/g, "").toLowerCase()
        if (currencyCheck === "idr" || currencyCheck === "rp") {
            value = Math.ceil(value)
        }

        const valueSplit = String(value.toFixed(isWallet?maxFractionDigits:0)).split(
            `${decimalSeparator}`
        )

        const firstvalue = valueSplit[0]
        const secondvalue = valueSplit[1]
        const valueReal = String(firstvalue).replace(
            /\B(?=(\d{3})+(?!\d))/g,
            `${decimalSeparator}`
        )

        if (Number(secondvalue) > 0) {
            result = this.position(
                currencyPosition,
                `${valueReal}${decimalSeparator}${secondvalue}`
            )
        }
        else {
            result = this.position(currencyPosition, `${valueReal}`)
        }

        return result
    }
}
