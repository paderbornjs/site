import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components/macro'
import spacings from '../../style/spacings'
import { useGetEventsQuery } from '../../typings/generated.d'
import LoadingIndicator from '../LoadingIndicator'
import EventDetails from './EventDetails'

const List = styled.ol`
  margin-top: ${spacings[5]};

  @media (min-width: 550px) and (max-width: 767px) {
    margin-top: ${spacings[6]};
  }

  @media (min-width: 768px) {
    margin-top: ${spacings[7]};
  }
`

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

  return (
    <List>
      {[data!.upcomingEvents[0]].map(upcomingEvent => (
        <EventDetails event={upcomingEvent} key={upcomingEvent.date} />
      ))}
    </List>
  )
}

export default Events
