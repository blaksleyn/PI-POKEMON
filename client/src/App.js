import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from "./components/Landing.jsx"
import Home from './components/Home';
import CreatePokemon from './components/CreatePokemon';
import Details from "./components/Details"
export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path ="/" component={Landing}/>
      <Route exact path ="/home" component ={Home}/>
      <Route path="/home/:id" component={Details}/>
      <Route path="/pokemon" component={CreatePokemon}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

 
