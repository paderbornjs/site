import React from 'react'
import { Flex, Image, Link } from 'rebass'
import { GetEventsQuery } from '../../typings/generated.d'
import { CallToAction } from './EventLocation.style'
import { ReactComponent as SvgMapIllustration } from './map.svg'

type Venue = GetEventsQuery['upcomingEvents'][0]['venue']

interface EventLocationProps {
  venue: Venue
  url: string
}
const EventLocation: React.FC<EventLocationProps> = ({ venue, url }) => {
  return (
    <Flex justifyContent="center" mt={[4, 4, 5]} mb={[5, 5, 6]}>
      <Link
        mr={5}
        href={`https://www.google.com/maps/dir//${venue.name},${venue.street},${
          venue.city
        }/@${venue.lat},${venue.lon},13z`}
      >
        <Image
          as={SvgMapIllustration}
          width={[120, 150, 200]}
          height={[105, 131, 175]}
        />
      </Link>
      <Flex flexDirection="column" justifyContent="center">
        <div>{venue.name}</div>
        <div>{venue.street}</div>
        {venue.city !== 'Paderborn' && <div>{venue.city}</div>}
        <div>
          <CallToAction
            href={url}
            fontSize={[2, 3, 4]}
            mt={[3, 3, 4]}
            py={[0, 1, 2]}
            px={[2, 3, 4]}
          >
            Sign up!
          </CallToAction>
        </div>
      </Flex>
    </Flex>
  )
}

export default EventLocation
