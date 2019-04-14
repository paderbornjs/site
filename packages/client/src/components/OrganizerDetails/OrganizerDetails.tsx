import React from 'react'
import { Box, Flex, Image, Text } from 'rebass'
import 'styled-components/macro'
import { GetOrganizersQuery } from '../../typings/generated.d'
import Link from '../Link'
import { ProfileImage, Wrapper } from './OrganizerDetails.style'
import { ReactComponent as TwitterLogo } from './twitter.svg'

export interface OrganizerDetailsProps {
  itemIndex: number
  organizer: GetOrganizersQuery['organizers'][0]
}

const OrganizerDetails: React.FC<OrganizerDetailsProps> = ({
  itemIndex,
  organizer: { name, description, twitterName, profileImageUrl },
}) => {
  return (
    <Wrapper flexDirection="column" alignItems="center">
      <Box mb={4}>
        <ProfileImage
          as="svg"
          width="250"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath id="clip">
              <rect x="0" y="0" width="100%" height="100%" rx="50%" />
            </clipPath>
            <filter id="duotone">
              <feColorMatrix
                type="matrix"
                values=".33 .33 .33 0 0 .33 .33 .53 0 0 .33 .33 .33 0 0 0 0 0 1 0"
              />
            </filter>
            <image
              href={profileImageUrl}
              id={`profile-${twitterName}`}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
              width="100%"
              height="100%"
            />
          </defs>
          <use href={`#profile-${twitterName}`} x="0" y="0" />
          <use href={`#profile-${twitterName}`} filter="url(#duotone)" />
        </ProfileImage>
      </Box>
      <Text fontSize={[4, 4, 5]} fontWeight={500} mb={0}>
        {name}
      </Text>
      <Link href={`http://twitter.com/${twitterName}`} mb={3}>
        <Flex as="span" alignItems="center">
          <Image as={TwitterLogo} mr={2} width={24} height={24} />
          {twitterName}
        </Flex>
      </Link>
      <Text as="p" textAlign="center" mb={0} css={{ maxWidth: '350px' }}>
        {description.split(/(@.*?|#.*?)\s/g).map(part =>
          part.startsWith('@') ? (
            <>
              <Link href={`https://twitter.com/${part.substring(1)}`}>
                {part}
              </Link>{' '}
            </>
          ) : part.startsWith('#') ? (
            <Text as="em" fontWeight={500} css={{ fontStyle: 'normal' }}>
              {part}{' '}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    </Wrapper>
  )
}

export default OrganizerDetails
