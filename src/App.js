import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Nav from './components/Nav/NavBar/Nav'
import routes from './routes'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import './App.css'

class App extends Component {

  render() {
    const theme = createMuiTheme({
      palette:{
          type:'dark'
      }
  })
    return (
      <div className='app'>
        <MuiThemeProvider theme={theme}>
          <Nav location={this.props.location} history={this.props.history}/>
          {routes}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);
