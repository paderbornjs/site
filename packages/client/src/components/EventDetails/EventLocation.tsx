import React from 'react'
import { Flex, Image, Link } from 'rebass'
import { GetEventsQuery } from '../../typings/generated.d'
import { CallToAction } from './EventLocation.style'
import { ReactComponent as SvgMapIllustration } from './map.svg'

interface EventLocationProps {
  venue: GetEventsQuery['upcomingEvents'][0]['venue']
  url: string
}

const EventLocation: React.FC<EventLocationProps> = ({ venue, url }) => {
  return (
    <Flex justifyContent="center" mb={[5, 6, 7]} mt={[4, 4, 5]}>
      <Link
        href={`https://www.google.com/maps/dir//${venue.name},${venue.street},${
          venue.city
        }/@${venue.lat},${venue.lon},13z`}
        mr={5}
      >
        <Image
          as={SvgMapIllustration}
          height={[105, 131, 175]}
          width={[120, 150, 200]}
        />
      </Link>
      <Flex flexDirection="column" justifyContent="center">
        <div>{venue.name}</div>
        <div>{venue.street}</div>
        {venue.city !== 'Paderborn' && <div>{venue.city}</div>}
        <div>
          <CallToAction
            fontSize={[2, 3, 4]}
            href={url}
            mt={[3, 3, 4]}
            px={[2, 3, 4]}
            py={[0, 1, 2]}
          >
            Sign up!
          </CallToAction>
        </div>
      </Flex>
    </Flex>
  )
}

export default EventLocation
