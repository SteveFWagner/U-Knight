import React from 'react';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const AttendingUser = (props) => {
    return (
        <div id='attending-user' onClick={()=>props.redirect(`/account/${props.data.user_id}`)}>
            <Paper id='attending-user-paper' elevation={1}>
                <Typography variant='h6'>
                    {props.data.username}
                </Typography>
                <img id='attending-user-image' src={props.data.image} alt="user"/>
            </Paper>
        </div>
    );
};

export default AttendingUser;