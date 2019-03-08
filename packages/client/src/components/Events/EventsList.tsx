import React from 'react'
import { EventsQueryQuery } from '../../typings/generated.d'
import EventDetails from './EventDetails'

const EventsList: React.FunctionComponent<EventsQueryQuery> = ({
  upcomingEvents,
}) => (
  <ul>
    <EventDetails event={upcomingEvents[0]} />
  </ul>
)

export default EventsList
