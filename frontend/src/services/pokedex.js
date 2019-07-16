import api from './../core/api';
const pokemons = require('./../assets/pokemon.json');

class pokedexService {
  getPokedexList() {
    return api.get('/pokedex/list');
  }

  getPokedexDetail(userId) {
    return api.get(`/pokedex/${userId}`);
  }

  addPokemon(pokemonId) {
    return api.post('/pokedex', { pokemonId });
  }
}

export default new pokedexService();