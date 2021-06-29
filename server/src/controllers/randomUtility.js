const seedRandom = require('seedrandom')
rng = seedRandom(Date.now().toString(), { entropy: true });

exports.getRandom = function (){
    return rng()
}
