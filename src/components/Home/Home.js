import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import EventsContainer from '../Search/EventsContainer'
import axios from 'axios'
import moment from 'moment'
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

    getData = async() => {
        const res = await axios.get('/api/events')
        const filteredData = await res.data.filter(event => {
            const eventStart = moment(event.start_date)
            const timeNow = moment()
            if(timeNow.diff(eventStart,'days') <= 0 ){
                return true
            }else {
                return false
            }
            
        })
        // console.log({filteredData})
        let sortedData = await filteredData.sort((a,b)=>{
            let timeA = moment(a.start_date)
            let timeB = moment(b.start_date)
            if(timeA>timeB){
                return -1
            }else if(timeA<timeB){
                return 1
            }else {
                return 0
            }
        })
        // console.log({sortedData})
        this.setState({
            events: sortedData
        })
      }



    render() {
        return (
            <div>
                <div id='header'>
                    <Typography variant='h2' id='home-title'>U-KNIGHT</Typography>
                    <Typography variant='h5' id='home-subtitle'>- Gaming Events Online & Near You -</Typography>
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