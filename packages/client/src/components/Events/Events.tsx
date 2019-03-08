import React from 'react'
import { Flex } from 'rebass'
import useImageLoader from '../../hooks/useImageLoader'
import { useEventsQuery } from '../../typings/generated.d'
import LoadingIndicator from '../LoadingIndicator'
import EventsList from './EventsList'

export const Events: React.FunctionComponent = () => {
  const { data, error, loading: queryLoading } = useEventsQuery()

  const imagesLoading = useImageLoader(
    data && data.upcomingEvents
      ? data.upcomingEvents
          .map(event => event.talks.map(talk => talk.speaker.avatarUrl))
          .flat()
      : []
  )

  if (error) {
    return <>{error.message}</>
  } else if (queryLoading || imagesLoading) {
    return (
      <Flex justifyContent="center">
        <LoadingIndicator />
      </Flex>
    )
  }

  return <EventsList upcomingEvents={data!.upcomingEvents} />
}

export default Events
