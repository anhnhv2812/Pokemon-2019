import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { MESSAGE, DEFAULT_HOME_PAGE } from './../../configs/constants';
import { pokedexService } from './../../services';
import { flashError, flashSuccess } from './../../utils/dialog';
import { redirectTo } from './../../utils/redirect';

class PokedexList extends Component {
  constructor() {
    super();
    this.state = {
      pokedexes: []
    }
  }

  handleError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  componentDidMount() {
    pokedexService.getPokedexList()
      .then(response => {
        this.setState({
          pokedexes: response
        });
      })
      .catch(error => this.handleError(error));
  }

  viewPokedex(pokedexId) {
    redirectTo(`/pokedex/${pokedexId}`);
  }

  render() {
    return (
      <div id="pokedex-list-component">
        <div className="title">Pokedexes</div>
        { 
          this.state.pokedexes.map(pokedex => {
            return (
              <div key={pokedex._id} className={`pokedex-list-item${pokedex.owner ? ' owner' : ''}`} onClick={() => this.viewPokedex(pokedex._id)}>
                {pokedex.username}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default PokedexList;
