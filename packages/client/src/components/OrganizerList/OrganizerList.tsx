import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import useImageLoadingState from '../../hooks/useImageLoadingState'
import { useGetOrganizersQuery } from '../../typings/generated.d'
import LoadingIndicator from '../LoadingIndicator'
import OrganizerDetails from '../OrganizerDetails'
import SectionHeading from '../SectionHeading'

const OrganizerList: React.FC = () => {
  const { data, error, loading: queryLoading } = useGetOrganizersQuery()
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const imagesLoading = useImageLoadingState(imageUrls)

  useEffect(() => {
    if (data && data.organizers) {
      setImageUrls(data.organizers.map(o => o.profileImageUrl))
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

  return (
    <>
      <SectionHeading>Organizers</SectionHeading>
      <Flex
        as="ul"
        flexDirection={['column', 'row', 'row']}
        mb={-6}
        mr={-6}
        p={0}
      >
        {data!.organizers.map((organizer, i) => (
          <Flex
            as="li"
            flex="1 1 50%"
            justifyContent="center"
            key={i}
            mb={6}
            mr={6}
          >
            <OrganizerDetails itemIndex={i} organizer={organizer} />
          </Flex>
        ))}
      </Flex>
    </>
  )
}

export default OrganizerList
