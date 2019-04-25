import React from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


function MessageList(props){

    const mappedMessages = props.messages.map(message => {
       
        
        return(

            <Paper key={message.message_id} style={{margin: 5, transform: 'rotate(180deg)', display: 'flex',}} onClick={() => {props.redirect(`/account/${message.user_id}`)}} >
                <Typography style={{color: '#00BF0C', marginRight: 8, marginLeft: 10 }}>
                {message.username}:
                </Typography>
                <Typography style={{color: '#00BF0C'}}>
                  {message.message}
                </Typography>
            </Paper>

        )

    })
    return <div>{mappedMessages}</div>
}

export default MessageList