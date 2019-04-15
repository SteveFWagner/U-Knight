import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import EventsContainer from '../Search/EventsContainer'
import axios from 'axios'
import './Home.css'

class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            events:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData() {
        axios.get("/events").then(res => {   
          this.setState({
            events: res.data,
            searchResults: res.data
          });
        });
      }



    render() {
        return (
            <div>
                <div id='header'>
                    <Typography variant='h2'>U-KNIGHT</Typography>
                    <Typography variant='h5'>- Gaming Events Online & Near You -</Typography>
                </div>
                <div id='content-container'>
                    <iframe 
                        src="https://www.youtube.com/embed/fd7ml1Mgyy0?rel=0;&autoplay=1&mute=1" frameBorder="0" 
                        allowFullScreen
                        title='potw'
                        >
                    </iframe>
                        <Typography variant='h4'>Upcoming Events:</Typography>
                    <div id='events-container'>
                        <EventsContainer data={this.state.events}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;