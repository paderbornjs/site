import raw from 'raw.macro'
import React from 'react'
import Markdown from 'react-markdown'
import { Box, Text } from 'rebass'
import { GetEventsQuery } from '../../typings/generated.d'
import Link from '../Link'
import { Bubble } from './Talk.style'

interface LinkRendererProps {
  href: string
}

const LinkRenderer: React.FC<LinkRendererProps> = props => <Link {...props} />

interface TalkProps {
  arrowPosition: 'left' | 'right'
  slot: GetEventsQuery['upcomingEvents'][0]['talks'][0] | null
}

const Talk: React.FC<TalkProps> = ({ arrowPosition, slot }) => {
  return (
    <Box as="li" flex={['auto', 'auto', 1]} mb={6} mr={5}>
      <Bubble arrowPosition={arrowPosition} p={[4, 4, 5]} pb={[3, 3, 3]}>
        <Text as="h3" fontSize={[2, 3, 4]} fontWeight={500} mb={3} mt={0}>
          {slot ? slot.title : 'Open slot'}
        </Text>
        <Markdown
          renderers={{
            link: LinkRenderer,
          }}
          skipHtml={true}
          source={slot ? slot.description : raw('./openSlot.md')}
        />
      </Bubble>
      <Text
        ml={arrowPosition === 'left' ? 4 : 0}
        mr={arrowPosition === 'right' ? 4 : 0}
        mt={5}
        textAlign={arrowPosition}
      >
        {slot ? (
          <>
            <b>{slot.speaker.name}</b>
            <div>{slot.speaker.occupation}</div>
            {slot.speaker.socialName && slot.speaker.socialUrl && (
              <div>
                <Link href={slot.speaker.socialUrl}>
                  {slot.speaker.socialName}
                </Link>
              </div>
            )}
          </>
        ) : (
          <>This might be you 👍</>
        )}
      </Text>
    </Box>
  )
}

export default Talk
