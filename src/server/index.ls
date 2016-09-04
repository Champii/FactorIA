require! {
  http
  express
  path
  \socket.io : socket
  \./Player
}

class FactorIA

  ->

    @app = express!
    @app.use express.static path.join __dirname, \../client
    console.log \clientDir, path.join __dirname, \../client
    @app.use (req, res, next) ->
      res.send \test

    @server = http.Server @app

    @io = socket @server

    @server.listen 3000

    Player
      .create login: \tontonTest2
      .then (.set login: \what)
      .then -> Player.fetch!
      .then console.log

module.exports = new FactorIA
