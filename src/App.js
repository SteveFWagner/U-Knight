import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div>
        <Nav location={this.props.location} history={this.props.history}/>
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
