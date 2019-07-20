import React, { Component } from 'react';
import { MESSAGE } from './../../configs/constants';
import { pokemonService } from './../../services';
import { flashError } from './../../utils/dialog';
import { redirectTo } from './../../utils/redirect';
import Pokemon from './../pokedexDetail/pokemonDetail';
import BackButton from './../../utils/backButton';
import './style.scss';

class PokedexDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedexdetail: [],
      pokedexId: props.match.params.id,
      pokemons: [],
      searchString: ''
    }
    this.searchTimer = null;
  }

  componentDidMount() {
    this.getPokemonList();
  }

  getPokemonList() {
    const params = {};
    const searchString = this.state.searchString.trim();

    if (searchString) {
      params.search = searchString;
    }

    pokemonService.getList(params)
      .then(response => {
        this.setState({
          pokemons: response
        });
      })
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  goBack() {
    redirectTo(`/pokedex/${this.state.pokedexId}`);
  }

  addPokemon() {
    redirectTo(`/pokedex/${this.state.pokedexId}/select-pokemon`);
  }

  handleChangeSearchString(e) {
    const searchString = e.target.value;
    this.setState({ searchString });

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.getPokemonList();
    }, 500);
  }

  render() {
    return (
      <div className="add-pokemon-component">
        <div className="header">
          <BackButton onClick={() => this.goBack()}/>
        </div>
        <div className="title">Add pokemon to pokedex #{this.state.pokedexId}</div>
        <div className="form-component-wrapper search-bar">
          <div className="component">
            <input type="text" placeholder="Search pokemons" value={this.state.searchString} onChange={(e) => this.handleChangeSearchString(e)}/>
          </div>
        </div>

        {
          this.state.pokemons.length ? this.state.pokemons.map(pokemon => (
            <div key={pokemon._id} className="pokemon-wrapper">
              <Pokemon {...pokemon} allowAddToList={!pokemon.added}/>
            </div>
          )) : ''
        }

      </div>
    );
  }
}

export default PokedexDetail;
