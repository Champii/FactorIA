/** The Player module.
 * @module Player
 */

require! {
  \./Entity
}

/**
 * Represents a PlayerModel class.
 * @constructor PlayerModel
 */

PlayerModel = Entity \Player do
  id: Entity.string!
  login: Entity.string!

/**
 * Represents a Player class.
 * @constructor Player
 */

class Player extends PlayerModel

module.exports = Player
