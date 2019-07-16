import api from './../core/api';

class pokemonService {
  getList(params) {
    return api.get('/pokemon/list', params);
  }
}

export default new pokemonService();