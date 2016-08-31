require! {
  express
  \socket.io : socket
  thinky     : _thinky
}

thinky = _thinky!
type = thinky.type

class FactorIA

  ->
    @server = http.Server app

    @io = socket @server

    Post = thinky.createModel \Post do
      id: type.string!
      title: type.string!

    post = new Post do
      title: "Hello World!",

    post
      .saveAll!
      .then console.log

module.exports = FactorIA
