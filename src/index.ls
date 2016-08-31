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

    Player
      .create login: \tontonTest2
      .then -> it.login = 'whesh'
      .then -> Player.fetch login: \tontonTest2
      .then console.log

module.exports = FactorIA
