const _ = require('lodash');
const BaseController = require('./baseController');

class Pokemon extends BaseController {
  constructor() {
    super();
    this.collection = 'pokemons';
  }

  async getList(byUserId, filter = {}) {
    const filterCondition = [];
    
    if (_.isArray(_.get(filter, 'pokemonIds')) && filter.pokemonIds.length) {
      filterCondition.push({ 
        _id: { 
          $in: filter.pokemonIds.map(id => this.ObjectId(id)) 
        } 
      });
    }

    const searchString = _.isString(_.get(filter, 'search')) ? filter.search.trim() : undefined;
    if (searchString) {
      filterCondition.push({
        $or: [
          { name: { $regex: new RegExp(searchString, 'i') } },
          { type: { $regex: new RegExp(searchString, 'i') } }
        ]
      });
    }

    const pokemonQuery = filterCondition.length ? { $and: filterCondition } : {};
    const [ addedPokemons, pokemonList ] = await Promise.all([
      this.getModel('pokedexDetail').find({ userId: byUserId }).toArray(),
      this.model.find(pokemonQuery).toArray()
    ]);

    pokemonList.forEach(pokemon => {
      pokemon.added = addedPokemons.findIndex(addedPokemon => addedPokemon.pokemonId === pokemon._id.toString()) === -1 ? false : true;
    });

    return pokemonList;
  }
}

module.exports = new Pokemon();