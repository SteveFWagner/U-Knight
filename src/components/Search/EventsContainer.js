import React from 'react';

import EventList from '../reusable/EventList'

const EventsContainer = (props) => {
    const mappedEvents = props.data.map((data, i)=>{
        return <EventList data={data} key={i}/>
    })
    return (
        <>
            {mappedEvents}
        </>
    );
};

export default EventsContainer;