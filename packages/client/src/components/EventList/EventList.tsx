import React from 'react'
import { Flex } from 'rebass'
import { useGetEventsQuery } from '../../typings/generated.d'
import EventDetails from '../EventDetails'
import LoadingIndicator from '../LoadingIndicator'

export const Events: React.FC = () => {
  const { data, error, loading } = useGetEventsQuery()

  if (error) {
    return <>{error.message}</>
  } else if (loading) {
    return (
      <Flex justifyContent="center">
        <LoadingIndicator />
      </Flex>
    )
  }

  return data!.upcomingEvents.length ? (
    <ol>
      {[data!.upcomingEvents[0]].map(upcomingEvent => (
        <EventDetails event={upcomingEvent} key={upcomingEvent.date} />
      ))}
    </ol>
  ) : (
    <Flex justifyContent="center">
      Usually, meetups are once a month - check back later for dates!
    </Flex>
  )
}

export default Events
