module.exports = {
  init: function () {
    var back = document.querySelector('main > a')
    if (back) {
      document.querySelector('.loader').style.display = 'none'
      back.href = 'javascript:history.back()'
    }
  }
}