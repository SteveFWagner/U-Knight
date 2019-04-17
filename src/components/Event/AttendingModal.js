import React, { Component } from 'react';
import './Events.css'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import AttendingUser from './AttendingUser'

class AttendingModal extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        const {eventId} = this.props
        axios.get(`/api/event/attending/${eventId}`)
        .then(res => {
            this.setState({
                data:res.data
            })
        })
    }

    render() {
        console.log(this.state)
        const mappedUsers = this.state.data.map((user,i) => {
            return <AttendingUser data={user} key={i} redirect={this.props.redirect}/>
        })

        return (
            <div id='attending-modal'>
                <Typography variant='h3'>
                    Attending this event:
                </Typography>
                <div id='attending-mappedUsers'>
                    {mappedUsers}
                </div>
            </div>
        );
    }
}

export default AttendingModal;