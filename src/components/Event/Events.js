import React, { Component } from 'react';
import axios from 'axios'
import './Events.css'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import {connect} from 'react-redux'
import {snackOpen, snackClose, modalOneOpen} from '../../ducks/reducer'
import Snackbar from '@material-ui/core/Snackbar'
import Modal from '@material-ui/core/Modal'
import AttendingModal from './AttendingModal'
import PayNow from './Payment/PayNow'
import io from 'socket.io-client';
import Input from '@material-ui/core/Input';
import MessageList from './MessageList'

import { addOne } from '../../tests/SteveTests/SteveLogic'

class Events extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            host:[],
            snackBar:false,
            snackBarMessage:'',
            modal:false,
            userCount:0,
            paymentModal:false,
            message: '',
            messages: [],
        }
    }

    componentDidMount(){
        this.getData()
        this.setSocketListeners()
       
        
    }
    //Sockets
    setSocketListeners = () => {
        const {id} = this.props.match.params
        this.socket = io()
        this.socket.emit('joinRoom', id)

        
        this.socket.on('sendMsg', (msg) => {
           
           this.setState({
               messages: msg,
               message: ''
           })
        })
    }

    
    
    sendMessage = () => {
        const data = {
            user_id: this.props.user_id,
            message: this.state.message,
            event_id: this.props.match.params.id,
            username: this.props.username
        }
        this.socket.emit('sendMsg',  data )
        this.setState({
            message: ''
        })
       
    }
    //Sockets

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
            this.attendingUserCount()
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

    handlePayNow = () => {
        if(this.props.user_id === 0){
            this.props.snackOpen();
            this.props.modalOneOpen();
        }else{
            this.handleUserInput('paymentModal',true)
        }
    }


    handleRedirect = async (value) => {
        await this.setState({
            modal:false
        })
        this.props.history.push(`${value}`)
    }

    attendingUserCount = () => {
        axios.get(`/api/event/attending/${this.props.match.params.id}`)
        .then(res => {
            let count = 0 
            res.data.forEach(user => {
                count = count +1
            })
            this.setState({
                userCount:count
            })
        })
    }
    
    addOne(val){
        return addOne(val)
    }

    render(){
        const {description, title, address, zipcode, start_date, end_date, image} = this.state.data
        const {username, image:userImage} = this.state.host
        let zipCheck = zipcode
        let addressCheck = address
        if(Number(zipCheck) === 1000){
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
                        <Button 
                            id='event-attending-button' 
                            variant='contained' 
                            color='primary'
                            onClick={()=>this.handleUserInput('modal',true)}>
                            attending ({this.state.userCount})
                        </Button>
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
                            style={{fontSize:'30px', margin:'10px'}}
                            onClick={()=>this.handlePayNow()}>
                            Pay Now*
                        </Button>
                        <Typography variant='body1'>
                            *See event description for details on any required payments prior to event.
                        </Typography>
                    </div>
                </div>

                <div id='event-3-wrapper'>
                    <div id='event-chat'>
                        <MessageList 
                        messages={this.state.messages}
                        redirect={this.handleRedirect}
                        />
                    </div>
                    <div id='event-chat-input-wrapper'>
                        <Input
                        id='event-chat-input'
                        value={this.state.message}
                        variant='filled'
                        multiline
                        rows={3}
                        rowsMax={3}
                        disableUnderline={true}
                        onChange={e => { this.handleUserInput('message', e.target.value)}}
                        />

                        
                        <Button variant='contained' color='secondary' onClick={() => {this.sendMessage()}}>
                            Send
                        </Button>
                    </div>
                </div>

                <Modal id='modal' open={this.state.modal} onClose={()=>this.handleUserInput('modal',false)}>
                    <AttendingModal eventId={this.props.match.params.id} redirect={this.handleRedirect}/>
                </Modal>
                <Modal id='payment-modal' open={this.state.paymentModal} onClose={()=>this.handleUserInput('paymentModal',false)}>
                    <PayNow closeModal={this.handleUserInput} eventId={this.props.match.params.id} userId={this.props.user_id}/>
                </Modal>
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
      username: state.username,
      snack: state.snack
    };
  };
  
  const mapDispatchToProps = {
    modalOneOpen,
    snackOpen,
    snackClose
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Events)