require! {
  \./thinky
}

/**
 * Represents a Entity class.
 * @constructor Entity
 * @param {string} name - The entity's name.
 * @param {string} schema - The entity's schema.
 */

_Entity = (name, schema) ->

  Model = thinky.createModel name, schema

  class Entity

    ->
      @model = new Model it

    @create = ->
      Promise.resolve new Entity it

    @fetch = ->
      Model.filter it || {}

    save: ->
      @model.save!then ~> @

    set: ->
      @ <<< it
      @model <<< it
      @save!

_Entity <<<< thinky.type
module.exports = _Entity
