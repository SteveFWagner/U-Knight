import React from 'react';


import EventList from '../reusable/EventList'

const EventsContainer = (props) => {
    const mappedEvents = props.data.map((data)=>{
        return <EventList data={data} key={data.event_id}/>
    })
    return (
        <div>
                {mappedEvents}
        </div>
        
    );
};

export default EventsContainer;