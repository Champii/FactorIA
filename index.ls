require! {
  \./src : FactorIA
  bluebird
}

global.Promise = bluebird

new FactorIA
