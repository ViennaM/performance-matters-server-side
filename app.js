var express = require('express')
var app = express()
var request = require('request')
var nunjucks = require('nunjucks')

app.use(express.static('public'))

nunjucks.configure('public/views', {
  autoescape: true,
  express: app
})

var api = {
  data: '',
  getData: function() {
    var query = `
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
      SELECT ?poster ?title ?img ?date ?description  WHERE {
        ?poster dc:type "Poster."^^xsd:string .
        ?poster dc:title ?title .
        ?poster dc:description ?description .
        FILTER (!REGEX(?title, "Poster"))
        FILTER (!REGEX(?title, "Photo"))
        FILTER (!REGEX(?date, "Ca"))
        ?poster foaf:depiction ?img .
        ?poster sem:hasBeginTimeStamp ?date .
      }
      ORDER BY ?poster
      LIMIT 1000
    `
    var encodedQuery = encodeURIComponent(query)
    var url = `https://api.data.adamlink.nl/datasets/AdamNet/all/services/endpoint/sparql?default-graph-uri=&query=${encodedQuery}&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`
    
    request(url, function (error, response, body) {
      api.data = JSON.parse(body).results.bindings.map(function (poster) {
        var obj = {
          id: poster.poster.value.substring(poster.poster.value.length - 6),
          img: poster.img.value,
          description: poster.description.value,
          title: poster.title.value.substring(0, poster.title.value.length - 1),
          date: poster.date.value.substring(0, 4)
        }
        return obj
      })
    })
  }
}

var randomPosters = function (data) {
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data;
}

app.get('/', function (req, res) {
  res.render('index.html', {
    posters: randomPosters(api.data).slice(0, 35)
  })
})

app.get('/poster/:id', function (req, res) {
  var posterDetail = api.data.filter((poster) => {
    return poster.id.includes(req.params.id)
  })
  res.render('poster.html', {
    poster: posterDetail[0]
  })
})

app.listen(8000, function () {
  api.getData()
  console.log('server is running on port 8000')

})
