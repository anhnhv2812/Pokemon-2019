const _ = require('lodash');
const BaseController = require('./baseController');

class Pokemon extends BaseController {
  constructor() {
    super();
    this.collection = 'pokemons';
  }

  async getList(byUserId, pokemonIds = null) {
    let pokemonQuery = !_.isArray(pokemonIds) || !pokemonIds.length
      ? this.model.find({})
      : this.model.find({ _id: { $in: pokemonIds.map(id => this.ObjectId(id)) } });

    const [ addedPokemons, pokemonList ] = await Promise.all([
      this.getModel('pokedexDetail').find({ userId: byUserId }).toArray(),
      pokemonQuery.toArray()
    ]);

    pokemonList.forEach(pokemon => {
      pokemon.added = addedPokemons.findIndex(addedPokemon => addedPokemon.pokemonId === pokemon._id.toString()) === -1 ? false : true;
    });

    return pokemonList;
  }
}

module.exports = new Pokemon();