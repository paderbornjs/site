import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import useImageLoadingState from '../../hooks/useImageLoadingState'
import { useEventsQuery } from '../../typings/generated.d'
import LoadingIndicator from '../LoadingIndicator'
import EventsList from './EventsList'

export const Events: React.FC = () => {
  const { data, error, loading: queryLoading } = useEventsQuery()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const imagesLoading = useImageLoadingState(imageUrls)

  useEffect(() => {
    if (data && data.upcomingEvents) {
      setImageUrls(
        data.upcomingEvents
          .map(event => event.talks.map(talk => talk.speaker.avatarUrl))
          .flat()
      )
    }
  }, [data])

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
