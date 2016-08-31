require! {
  \./Entity
}

PlayerModel = Entity \Player do
  id: Entity.string!
  login: Entity.string!

class Player extends PlayerModel

module.exports = Player
