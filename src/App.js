import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/detailsMovie';

class App extends React.Component {

  constructor(props){
    super();
  }


  render(){
    return(
<Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/detailsmovie/:id" component={MovieDetails} />
          <Route exact path="/">
            <Login />
          </Route>
          
        </Switch>
    </Router>
    );
  }


}


export default App;
