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

  proxyHandler =
    get: (target, key) ->
    set: (target, key, value) ->
      target.save!
      true

  class Entity

    ->
      @model = new Model it

    @create = ->
      entity = new Entity it

      Promise.resolve new Proxy entity, proxyHandler

    @fetch = ->
      Model.filter it || {}

    save: ->
      @model.save!

_Entity <<<< thinky.type
module.exports = _Entity
