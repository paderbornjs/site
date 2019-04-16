import React from 'react'
import { Flex } from 'rebass'
import { GetEventsQuery } from '../../typings/generated.d'
import SectionHeading from '../SectionHeading'
import Talk from '../Talk'
import EventHeading from './EventHeading'
import EventLocation from './EventLocation'

type Event = GetEventsQuery['upcomingEvents'][0]
type Talk = Event['talks'][0]

export interface EventDetailsProps {
  event: Event
  slotCount?: number
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event: { date, goingCount, url, talks, venue },
  slotCount = 2,
}) => {
  return (
    <li>
      <EventHeading date={date} />
      <EventLocation url={url} venue={venue} />

      <SectionHeading as="h2">Talks</SectionHeading>
      <Flex as="ol" flexWrap="wrap" mb={-5} mr={-5}>
        {[
          ...talks,
          ...Array.from({ length: slotCount - talks.length }).map(() => null),
        ].map((slot, i) => (
          <Talk
            arrowPosition={i % 2 === 0 ? 'right' : 'left'}
            key={i}
            slot={slot}
          />
        ))}
      </Flex>
    </li>
  )
}

export default EventDetails
