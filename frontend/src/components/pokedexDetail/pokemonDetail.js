import React, { Component } from 'react';
import _ from 'lodash';
import { pokedexService } from './../../services';
import { MESSAGE } from './../../configs/constants';
import { flashError } from './../../utils/dialog';
import './pokemonDetailStyle.scss';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      added: !!props.allowAddToList
    }
  }

  handleError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  addPokemon(pokemonId) {
    pokedexService.addPokemon(pokemonId)
      .then(() => {
        this.setState({
          added: !this.state.added
        });
      })
      .catch(error => this.handleError(error));
  }

  render() {
    const pokemon = this.props;

    return (
      <div className="pokemon-detail-component">
        <div className="image">
          <img src={pokemon.imageUrl}/>
        </div>
        <div className="description">
          <div className="name">{pokemon.name || ''}</div>
          <div>Type: {pokemon.type || ''}</div>
          <div>HP: {pokemon.hp || ''}</div>
          <div>ATK: {_.isArray(pokemon.attacks) ? pokemon.attacks.length * 50 : 0}</div>
          <div>RES: {_.isArray(pokemon.resistances) ? pokemon.resistances.length * 20 : 0}</div>
          { this.state.added === true ? <button onClick={() => this.addPokemon(pokemon._id)}>Add to Pokedex</button> : '' }
        </div>
      </div>
    );
  }
}

export default Pokemon;
