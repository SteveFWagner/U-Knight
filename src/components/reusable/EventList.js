import React from 'react';

function EventList(props){
    console.log(props.data)
    return(
            <div>
                <h4>Event Title: {props.data.title}</h4>
                <p>{props.data.description}</p>
            </div>

        )
}

export default EventList