import React, { Component } from 'react';
import { MESSAGE } from './../../configs/constants';
import { pokedexService } from './../../services';
import { flashError } from './../../utils/dialog';
import { redirectTo } from './../../utils/redirect';
import Pokemon from './pokemonDetail';
import BackButton from './../../utils/backButton';
import './style.scss';

class PokedexDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedexdetail: [],
      pokedexId: props.match.params.id,
      pokemons: [],
      owner: false
    }
  }

  handleError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  componentDidMount() {
    pokedexService.getPokedexDetail(this.state.pokedexId)
      .then(response => {
        this.setState({
          pokemons: response.pokemons,
          owner: response.owner
        });
      })
      .catch(error => this.handleError(error));
  }

  goBack() {
    redirectTo('/pokedexes');
  }

  addPokemon() {
    const pokedexId = this.state.pokedexId;
    redirectTo(`/pokedex/${pokedexId}/select-pokemon`);
  }

  render() {
    return (
      <div className="pokedex-detail-component">
        <div className="header">
          <BackButton onClick={this.goBack}/>
        </div>
        <div className="title">Pokedex #{this.state.pokedexId}</div>

        { this.state.owner ? <div className="add-button" onClick={() => this.addPokemon()}>Add Pokemon</div> : '' }

        {
          this.state.pokemons.length ? this.state.pokemons.map(pokemon => (
            <div key={pokemon._id} className="pokemon-wrapper"><Pokemon {...pokemon}/></div>
          )) : ''
        }

      </div>
    );
  }
}

export default PokedexDetail;
