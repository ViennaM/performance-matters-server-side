(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
var kaas = require('./main.js')
},{"./main.js":2}],2:[function(require,module,exports){
module.exports = {
  kaas: function () {
    var posters = document.querySelectorAll('ol li')

    if (posters) {

      for (var i = 0; i < posters.length; i++) {
        posters[i].style.display = 'none'
      }

      var loader = '<div class="loader" id="loader"><span></span><span></span><span></span></div>'


      var main = document.querySelector('main')
      main.insertAdjacentHTML('beforeend', loader)

      var images = document.querySelectorAll('ol li picture img')
      var count = 0
      for (var i = 0; i < images.length; i++) {
        var objImg = new Image()
        objImg.src = images[i].src
        objImg.onload = function () {
          count++
          if (count > 34) {
            for (var i = 0; i < posters.length; i++) {
              posters[i].style.animationDelay = `${i * 100}ms`
              posters[i].style.display = 'block'
            }
            document.querySelector('.loader').style.display = 'none'
          }
        }
      }
    }
    var back = document.querySelector('main > a')
    if (back) {
      document.querySelector('.loader').style.display = 'none'
      back.href = 'javascript:history.back()'
    }
  }
}
},{}]},{},[1]);
