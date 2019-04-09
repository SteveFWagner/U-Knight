import React, { Component } from 'react';

import Nav from './components/Nav/Nav'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        {routes}
      </div>
    );
  }
}

export default App;
