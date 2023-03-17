function isNumber(num) {
    num = parseFloat(num)
    const number = num.toFixed(2)
    return Number(number)
}
module.exports = isNumber