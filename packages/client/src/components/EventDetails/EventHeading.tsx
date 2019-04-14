import React from 'react'
import SectionHeading from '../SectionHeading'
import { EventDate } from './EventHeading.style'

interface EventHeadingProps {
  date: string
}

const EventHeading: React.FC<EventHeadingProps> = ({ date }) => {
  const todayDate = new Date()
  const eventDate = new Date(date)

  const isEventToday =
    todayDate.getMonth() === eventDate.getMonth() &&
    todayDate.getDate() === eventDate.getDate()

  return (
    <SectionHeading>
      Next Meetup:{' '}
      <EventDate as="em">
        {isEventToday
          ? 'Today 7pm'
          : eventDate.toLocaleString('en-us', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
      </EventDate>
    </SectionHeading>
  )
}

export default EventHeading
