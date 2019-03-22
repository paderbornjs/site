import React from 'react'
import { GetEventsQuery } from '../../typings/generated.d'
import SectionHeadline from '../SectionHeadline'
import Talk from '../Talk'
import { CallToAction, Talks } from './EventDetails.style'

export interface EventDetailsProps {
  event: GetEventsQuery['upcomingEvents'][0]
  slotCount?: number
}

const EventDetails: React.FC<EventDetailsProps> = ({
  event: { date, goingCount, url, talks, venue },
  slotCount = 2,
}) => {
  const slots: (GetEventsQuery['upcomingEvents'][0]['talks'][0] | null)[] = [
    ...talks,
    ...Array.from({ length: slotCount - talks.length }).map(() => null),
  ]

  const slotElements: JSX.Element[] = slots.map((slot, i) => (
    <Talk key={i} slot={slot} arrowPosition={i % 2 === 0 ? 'right' : 'left'} />
  ))

  return (
    <li>
      <SectionHeadline element="h2">
        Next Meetup:{' '}
        <em>
          {new Date(date).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </em>
      </SectionHeadline>

      <div
        style={{
          display: 'block',
          justifyContent: 'center',
        }}
      >
        <div>{JSON.stringify(venue)}</div>
        <CallToAction href={url}>Are you going? ({goingCount})</CallToAction>
      </div>
      <SectionHeadline element="h2">Talks</SectionHeadline>
      <Talks>{slotElements}</Talks>
    </li>
  )
}

export default EventDetails
