import React, { Component } from 'react';
import { MESSAGE } from './../../configs/constants';
import { pokemonService } from './../../services';
import { flashError } from './../../utils/dialog';
import { redirectTo } from './../../utils/redirect';
import Pokemon from './../pokedexDetail/pokemonDetail';
import './style.scss';

class PokedexDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedexdetail: [],
      pokedexId: props.match.params.id,
      pokemons: []
    }
  }

  handleError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  componentDidMount() {
    pokemonService.getList()
      .then(response => {
        this.setState({
          pokemons: response
        });
      })
      .catch(error => this.handleError(error));
  }

  goBack() {
    redirectTo(`/pokedex/${this.state.pokedexId}`);
  }

  addPokemon() {
    redirectTo(`/pokedex/${this.state.pokedexId}/select-pokemon`);
  }

  render() {
    return (
      <div className="add-pokemon-component">
        <div className="header" onClick={() => this.goBack()}>Back</div>
        <div className="title">Add pokemon to pokedex #{this.state.pokedexId}</div>

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
