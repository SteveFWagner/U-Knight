import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import zipcodes from 'zipcodes'
import Button from '@material-ui/core/Button'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Slide from '@material-ui/core/Slide'

import './EventList.css'

class EventList extends Component{
    constructor(props){
        super(props)
        this.state={
            state:'',
            cityOrOnline:'loading...',
            zipcode:null,
            startDate:'loading...'
        }
    }

    componentDidMount(){
        this.setLocation()
        this.setDate()
    }

    setDate = () => {
        let time = moment(this.props.data.start_date).format('LLL')
        this.setState({
            startDate:time
        })
    }

    setLocation = async() =>{
        let location = await zipcodes.lookup(this.props.data.zipcode)
        if(this.props.data.zipcode === 1000){
            this.setState({
                cityOrOnline:'Online',
            })
        }else if(location === undefined){
            this.setState({
                cityOrOnline:'View Event for details!',
            })
        }else{
            this.setState({
                state:location.state,
                cityOrOnline:location.city
            })

        }
    }
    
    render(){
        return(
            <Slide direction='up' in={true} timeout={500} mountOnEnter unmountOnExit>

                <Paper elevation={1} id='event-container'>
                    <div>
                        <Typography variant='h5'>{this.props.data.title}</Typography>
                        <Typography variant='body1'>{this.props.data.category}</Typography>
                    </div>
                    <div>
                        <Typography variant='body1'>When: {this.state.startDate}</Typography>
                        <Typography variant='body1'>Where: {this.state.cityOrOnline} {this.state.state}</Typography>
                    </div>
                    <div>
                        <Button variant='contained' color='primary' component={Link} to={`/event/${this.props.data.event_id}`}>
                            View Event
                        </Button>
                    </div>
                </Paper>
            </Slide>
        )
    }
}

export default EventList