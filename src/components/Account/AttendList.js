import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

function AttendList(props){
    
    const mappedAttended = props.attended.map(event => {
    
        return(
            <Paper key={event.event_id}  className='accountlists' >
                <Typography id='eventheader' >{event.title}</Typography>
                <Typography style={{ fontSize: 20 }}>Hosted by {event.username}</Typography>
                <Typography style={{ fontSize: 20 }}>The category was {event.category}.</Typography>
                <Typography style={{ fontSize: 20 }}>{moment(event.start_date).format(`LL`)}</Typography>
            </Paper>
        )

    })
    return <div>{mappedAttended}</div>
}

export default AttendList