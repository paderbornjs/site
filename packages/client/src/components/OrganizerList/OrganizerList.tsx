import React, { useEffect, useState } from 'react'
import { PoseGroup } from 'react-pose'
import { Flex } from 'rebass'
import useImageLoadingState from '../../hooks/useImageLoadingState'
import { useGetOrganizersQuery } from '../../typings/generated.d'
import LoadingIndicator from '../LoadingIndicator'
import OrganizerCard from '../OrganizerCard'
import SectionHeadline from '../SectionHeadline'
import { List, ListItem } from './OrganizerList.style'

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
      <SectionHeadline element="h2">Organizers</SectionHeadline>
      <List>
        <PoseGroup animateOnMount={true}>
          {data!.organizers.map((organizer, i) => (
            <ListItem key={i} itemIndex={i}>
              <OrganizerCard itemIndex={i} organizer={organizer} />
            </ListItem>
          ))}
        </PoseGroup>
      </List>
    </>
  )
}

export default OrganizerList
