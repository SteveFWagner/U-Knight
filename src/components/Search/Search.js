import React, { Component } from 'react';
import axios from 'axios'

import EventsContainer from './EventsContainer'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            events:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        axios.get('/events')
        .then( res =>{
            this.setState({
                events:res.data
            })
        }
        )
    }


    render(){
        console.log(this.state)

        return(
            <div>
                <h1>Search for an Event!</h1>
                <input type="text"/>
                <EventsContainer data={this.state.events}/>
            </div>
        )
    }
}

export default Search