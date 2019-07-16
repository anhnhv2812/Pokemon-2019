import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dialog from './utils/dialog';
import Redirect from './utils/redirect';
import Login from './components/login/';
import Signup from './components/signup/';
import PokedexList from './components/pokedexList/';
import PokedexDetail from './components/pokedexDetail/';
import AddPokemon from './components/addPokemon/';
import './assets/globalStyle.scss';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/pokedexes" exact component={PokedexList} />
          <Route path="/pokedex/:id" exact component={PokedexDetail} />
          <Route path="/pokedex/:id/select-pokemon" exact component={AddPokemon} />
          <Redirect/>
        </Router>
        <Dialog/>
      </div>
    );
  }
}

export default App;
