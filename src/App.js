import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'

class App extends Component {

  render() {
    const theme = createMuiTheme({
      palette:{
          type:'dark'
      }
  })
    return (
      <div style={{backgroundImage:`url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80')`}}>
        <MuiThemeProvider theme={theme}>
          <Nav location={this.props.location} history={this.props.history}/>
          {routes}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
