import React, { Component } from 'react';
import { Route, Switch, browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter, Link } from 'react-router-dom';
import Pickup from './Pickup'
import Pickups from './Pickups'
import Drivers from './Drivers'
import Driver from './Driver'
import Days from './Days'
import Day from './Day'

const history = createBrowserHistory();

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path='/pickups' component={Pickups} />
            <Route exact path='/pickups/:id' component={Pickup} />
            <Route exact path='/drivers' component={Drivers} />
            <Route exact path='/drivers/:id' component={Driver} />
            <Route exact path='/days' component={Days} />
            <Route exact path='/days/:id' component={Day} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  };
};

export default App;
