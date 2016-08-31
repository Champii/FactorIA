require! {
  http
  express
  \socket.io : socket
  \./Player
}

class FactorIA

  ->
    @app = express!
    @server = http.Server @app
    @io = socket @server

    @server.listen 3000

    Player
      .create login: \tontonTest2
      .then (.set login: \what)
      .then -> Player.fetch!
      .then console.log

module.exports = FactorIA
