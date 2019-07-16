import api from './../core/api';

class pokemonService {
  getList() {
    return api.get('/pokemon/list');
  }
}

export default new pokemonService();