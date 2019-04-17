import React, { Component } from 'react';
import axios from 'axios'
import './Events.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import {connect} from 'react-redux'
import {snackOpen, snackClose, modalOneOpen} from '../../ducks/reducer'
import Snackbar from '@material-ui/core/Snackbar'


class Events extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            host:[],
            snackBar:false,
            snackBarMessage:''
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

    handleUserInput = (prop,val) => {
        this.setState({
            [prop]:val
        })
    }

    handleSignUp = () =>{
        if(this.props.user_id === 0){
            this.props.snackOpen();
            this.props.modalOneOpen();
        }else{
            console.log(this.props.user_id)
            console.log(this.props.match.params.id)
            const event_id = this.props.match.params.id
            const {user_id} = this.props
            axios.post('/api/event/signup', {event_id, user_id})
            .then(res => {
                this.setState({
                    snackBarMessage:res.data,
                    snackBar:true
                })
            })
            .catch(err => console.log(err))
        }
    }
    

    render(){
        console.log(this.state)
        const {description, title, address, zipcode, start_date, end_date, image} = this.state.data
        const {username, image:userImage} = this.state.host
        let zipCheck = zipcode
        let addressCheck = address
        if(zipCheck == 1000){
            zipCheck = ''
            addressCheck = 'Online!'
        }
        let startDate = moment(start_date).format('MMMM Do YYYY, h:mm a')
        let endDate = moment(end_date).format('MMMM Do YYYY, h:mm a')
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
                                    Start time: {startDate}
                                </Typography>
                                <Typography id='event-date' variant='body1'>
                                    End time: {endDate}
                                </Typography>
                            </div>
                            <div id='event-location-container'>
                                <Typography variant='h5' color='secondary'>
                                    Where:
                                </Typography>
                                <Typography id='event-location' variant='body1'>
                                    {addressCheck} {zipCheck}
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
                            style={{fontSize:'30px', margin:'10px'}}
                            onClick={()=>this.handleSignUp()}>
                            Sign Up
                        </Button>
                        <Button 
                            className='event-signup-pay-button'
                            variant='contained'
                            color='primary'
                            style={{fontSize:'30px', margin:'10px'}}>
                            Pay Now*
                        </Button>
                        <Typography variant='body1'>
                            *See event description for details on any required payments prior to event.
                        </Typography>
                    </div>
                </div>
                <div id='event-3-wrapper'>
                    <div id='event-chat'>
                        <Typography variant='body1' style={{color:'#00BF0C'}}>
                            kyle@3:30pm - Hello!
                        </Typography>
                        <Typography variant='body1' style={{color:'#00BF0C'}}>
                            kyle@3:31pm - :'(
                        </Typography>
                    </div>
                    <div id='event-chat-input-wrapper'>
                        <div id='event-chat-input'>

                        </div>
                        <Button variant='contained' color='secondary'>
                            Send
                        </Button>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    autoHideDuration={3000}
                    open={this.state.snackBar}
                    onClose={()=>this.handleUserInput('snackBar',false)}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    message={<span > {this.state.snackBarMessage} </span>}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      user_id: state.user_id,
      snack: state.snack
    };
  };
  
  const mapDispatchToProps = {
    modalOneOpen,
    snackOpen,
    snackClose
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Events)