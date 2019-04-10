import React from 'react';

function EventList(props){
    return(
            <div>
                <h4>Event Title: {props.data.title}</h4>
                <p>{props.data.description}</p>
            </div>

        )
}

export default EventList