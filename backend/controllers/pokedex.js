const joi = require('joi');
const _ = require('lodash');
const BaseController = require('./baseController');
const UserController = require('./user');
const PokemonController = require('./pokemon');

class Pokedex extends BaseController {
  constructor() {
    super();
    this.collection = 'pokedexDetail';
  }

  async getList(byUser) {
    try {
      const pokedexList = await UserController.getList(byUser);

      pokedexList.forEach(pokedex => {
        if (_.isEqual(pokedex._id, byUser._id)) {
          pokedex.owner = true;
        }
      });

      return pokedexList;
    } catch(error) {
      throw error;
    }
  }

  addPokemon(params, toUserId) {
    const schema = joi.object().keys({
      pokemonId: joi.string().trim().required()
    });

    const validationResult = joi.validate(params, schema);
    if (validationResult.error) {
      throw _.get(validationResult, 'error.details[0].message') || validationResult.error;
    }

    return this.model.insert({
      userId: toUserId,
      pokemonId: validationResult.value.pokemonId
    });
  }

  async getDetail(userId, byUserId) {
    try {
      const pokemonPlainObjects = await this.model.find({ userId }).toArray();
      const pokemons = await PokemonController.getList(byUserId, pokemonPlainObjects.map(pokemon => pokemon.pokemonId));

      const result = {
        pokemons: pokemons,
        owner: userId === byUserId
      }

      return result;
    } catch(error) {
      throw error;
    }
  }
}

module.exports = new Pokedex();