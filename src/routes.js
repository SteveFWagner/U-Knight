import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Account from './components/Account/Account'
import Event from './components/Event/Events'
import HostEvent from './components/HostEvent/HostEvent'
import Search from './components/Search/Search'
import Home from './components/Home/Home'

export default(
    <Switch>
        <Route path='/HostEvent' component={HostEvent}/>
        <Route path='/Account' component={Account}/>
        <Route path='/Search' component={Search}/>
        <Route path='/Event' component={Event}/>
        <Route exact path='/' component={Home}/>
    </Switch>
)