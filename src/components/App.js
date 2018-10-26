import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Provider } from '../context';
import  Navbar  from './layout/Navbar';
import Index from './layout/Index';
import Lyrics from './tracks/Lyrics';



class App extends Component {
  render() {
    return (
      <Provider>
      <BrowserRouter>
        <Fragment>
        <Navbar />
         <div className="container">
           <Switch>
             <Route exact path = '/' component = {Index} />
             <Route exact path = '/lyrics/track/:id' component = {Lyrics} />
           </Switch>
         </div> 
        </Fragment>
      </BrowserRouter>  
      </Provider>        
    );
  }
}

export default App;

