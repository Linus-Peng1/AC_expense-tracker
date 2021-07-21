module.exports = {
  isSelected: function (a, b) {
    return a === b
  },
  toDate: function (date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))
      .toISOString()
      .split("T")[0]
  }
}