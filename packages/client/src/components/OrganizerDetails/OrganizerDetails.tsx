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
    <Wrapper alignItems="center" flexDirection="column">
      <Box mb={4}>
        <ProfileImage
          as="svg"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 100 100"
          width="225"
        >
          <defs>
            <clipPath id="clip">
              <rect height="100%" rx="50%" width="100%" x="0" y="0" />
            </clipPath>
            <filter id="duotone">
              <feColorMatrix
                type="matrix"
                values=".33 .33 .33 0 0 .33 .33 .53 0 0 .33 .33 .33 0 0 0 0 0 1 0"
              />
            </filter>
            <image
              clipPath="url(#clip)"
              height="100%"
              href={profileImageUrl}
              id={`profile-${twitterName}`}
              preserveAspectRatio="xMidYMid slice"
              width="100%"
            />
          </defs>
          <use href={`#profile-${twitterName}`} x="0" y="0" />
          <use filter="url(#duotone)" href={`#profile-${twitterName}`} />
        </ProfileImage>
      </Box>
      <Text fontSize={[4, 4, 5]} fontWeight={500} mb={0}>
        {name}
      </Text>
      <Link href={`http://twitter.com/${twitterName}`} mb={3}>
        <Flex alignItems="center" as="span">
          <Image as={TwitterLogo} height={24} mr={2} width={24} />
          {twitterName}
        </Flex>
      </Link>
      <Text as="p" css={{ maxWidth: '350px' }} mb={0} textAlign="center">
        {description.split(/(@.*?|#.*?)\s/g).map((part, i) => (
          <React.Fragment key={i}>
            {part.startsWith('@') ? (
              <>
                <Link href={`https://twitter.com/${part.substring(1)}`}>
                  {part}
                </Link>{' '}
              </>
            ) : part.startsWith('#') ? (
              <Text as="em" css={{ fontStyle: 'normal' }} fontWeight={500}>
                {part}{' '}
              </Text>
            ) : (
              part
            )}
          </React.Fragment>
        ))}
      </Text>
    </Wrapper>
  )
}

export default OrganizerDetails
