module.exports = {
  init: function () {
    var posters = document.querySelectorAll('ol li')

    if (posters) {

      for (var i = 0; i < posters.length; i++) {
        posters[i].style.display = 'none'
      }

      var loader = '<div class="loader" id="loader"><span></span><span></span><span></span></div>'


      var main = document.querySelector('main')
      
      if (!navigator.onLine) {
        var message = '<p>Je bent offline... Deze pagina is waarschijnlijk niet up to date.</p>'
        console.log('offline')
        main.insertAdjacentHTML('afterbegin', message)
      } else {
        console.log('online')
      }

      main.insertAdjacentHTML('beforeend', loader)

      var images = document.querySelectorAll('ol li picture img')
      var count = 0
      for (var i = 0; i < images.length; i++) {
        var objImg = new Image()
        objImg.src = images[i].src
        objImg.onload = function () {
          count++
          if (count > 7) {
            for (var i = 0; i < posters.length; i++) {
              posters[i].style.animationDelay = `${i * 100}ms`
              posters[i].style.display = 'block'
            }
            document.querySelector('.loader').style.display = 'none'
          }
        }
      }
    }
  }
}