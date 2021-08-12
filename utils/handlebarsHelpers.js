module.exports = {
  isSelected: function (a, b) {
    return a === b
  },
  convertDate: function (date) {
    // date = Tue Aug 10 2021 08:00:00 GMT+0800 (GMT+08:00)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    month = month < 10 ? ('0' + month) : month
    day = day < 10 ? ('0' + day) : day

    return (year + '-' + month + '-' + day)
  }
}