import React, { Component } from 'react';
import axios from 'axios'
import './Events.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


class Events extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            host:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = async () => {
        try {
            let eventData = await axios.get(`/api/event/${this.props.match.params.id}`)
            this.setState({
                data:eventData.data[0]
            })
            let hostData = await axios.get(`/api/event/host/${this.state.data.user_id}`)
            this.setState({
                host:hostData.data[0]
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    

    render(){
        console.log(this.state)
        const {description, title, address, zipcode, start_date, end_date, image} = this.state.data
        const {username, image:userImage} = this.state.host
        return(
            <div id='event-wrapper'>
                <div id='event-1-wrapper'>
                    <div id='event-host-attending-wrapper'>
                        <img id='event-host' src={userImage} alt="host"/>
                        <div>
                            <Typography variant='h5'>
                                Event Host:
                            </Typography>
                            <Typography variant='h3'>
                                {username}
                            </Typography>
                        </div>
                        <Button id='event-attending-button' variant='contained' color='primary'>attending (5)</Button>
                    </div>
                    <div id='event-description-wrapper'>
                        <Typography variant='h4' color='secondary'>
                            {title}
                        </Typography>
                        <Typography id='event-description' variant='body1'>
                            {description}
                        </Typography>
                        <div id='event-when-where'>
                            <div>
                                <Typography variant='h5' color='secondary'>
                                    When:
                                </Typography>
                                <Typography id='event-date' variant='body1'>
                                    Start time: {start_date}
                                </Typography>
                                <Typography id='event-date' variant='body1'>
                                    End time: {end_date}
                                </Typography>
                            </div>
                            <div id='event-location-container'>
                                <Typography variant='h5' color='secondary'>
                                    Where:
                                </Typography>
                                <Typography id='event-location' variant='body1'>
                                    {address} {zipcode}
                                </Typography>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div id='event-2-wrapper'>
                    <img id='event-image' src={image} alt="event"/>
                    <div id='event-signup-pay-wrapper'>
                        <Button
                            className='event-signup-pay-button'
                            variant='contained'
                            color='secondary'
                            style={{fontSize:'30px', margin:'10px'}}>
                            Sign Up
                        </Button>
                        <Button 
                            className='event-signup-pay-button'
                            variant='contained'
                            color='primary'
                            style={{fontSize:'30px', margin:'10px'}}>
                            Pay Now*
                        </Button>
                        <Typography variant='body2'>
                            *See event description for details on any required payments prior to event.
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events