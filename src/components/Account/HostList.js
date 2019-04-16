import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


function HostList(props){

    const mappedHosted = props.hosted.map(event => {
        
        return(

            <Paper key={event.event_id} style={{display: 'flex', justifyContent: 'space-around',}} className={props.classes.paper}>
                <Typography style={{ fontSize: 20 }}>Event name: {event.title}</Typography>
                <Typography style={{ fontSize: 20 }}>Event category: {event.category}</Typography>
                <Typography style={{ fontSize: 20 }}>Event Date: {event.start_date}</Typography>
            </Paper>

        )

    })
    return <div>{mappedHosted}</div>
}

export default HostList