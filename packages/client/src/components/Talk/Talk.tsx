import React from 'react'
import styled from 'styled-components/macro'
import spacings from '../../style/spacings'
import { GetEventsQuery } from '../../typings/generated.d'
import Link from '../Link'
import { Description, Title } from './Talk.style'

const Container = styled.li`
  position: relative;
  margin-bottom: ${spacings[4]};

  @media (min-width: 768px) {
    flex: 1;

    &:first-child {
      margin-right: 32px;
    }
  }
`

interface ArrowPositionProps {
  arrowPosition: 'left' | 'right'
}

const positionArrow = () => (props: ArrowPositionProps) =>
  `${props.arrowPosition}: ${spacings[5]};`

const Bubble = styled.div<ArrowPositionProps>`
  padding: ${spacings[2]};
  margin: 0;
  border-radius: ${spacings[2]};
  border: 2px solid #e9f2f5;
  background: #f9fcfd;
  position: relative;
  z-index: 0;

  &::before,
  &::after {
    ${positionArrow()}
    display: block;
    position: absolute;
    bottom: -18px;
    width: 0;
    height: 0;
    content: ' ';
    border: solid 20px transparent;
    border-bottom: 0;
    border-top-color: #f9fcfd;
    overflow: hidden;
    z-index: 2;
  }

  &::before {
    bottom: -20px;
    border-top-color: #e9f2f5;
    z-index: 1;
  }

  @media (min-width: 550px) and (max-width: 767px) {
    border: 3px solid #e9f2f5;
    padding: ${spacings[3]};

    &::before {
      bottom: -22px;
    }
  }

  @media (min-width: 768px) {
    border: 4px solid #e9f2f5;
    padding: ${spacings[4]};

    &::before {
      bottom: -24px;
    }
  }
`

const Speaker = styled.div<ArrowPositionProps>`
  margin-top: ${spacings[4]};
  margin-left: ${props => (props.arrowPosition === 'left' ? spacings[4] : 0)};
  margin-right: ${props => (props.arrowPosition === 'right' ? spacings[4] : 0)};
  text-align: ${props => props.arrowPosition};
`

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
    <Container>
      <Bubble arrowPosition={arrowPosition}>
        {slot ? (
          <React.Fragment>
            <Title>{slot.title}</Title>
            <Description
              source={slot.description}
              skipHtml={true}
              renderers={{
                link: LinkRenderer,
              }}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Title>Open slot</Title>
            <p>
              This slot is still open. Feel free to{' '}
              <Link href="https://github.com/paderbornjs/talks#submitting-a-talk">
                submit a talk
              </Link>
              ! First-timers and beginners are welcome. We manage a list of{' '}
              <Link href="https://github.com/paderbornjs/talks/issues?q=is%3Aissue+is%3Aopen+label%3A%22Talk+Idea%22">
                talk ideas
              </Link>{' '}
              on our Github talks repository.
            </p>
            <p>
              Lightning talks or short presentations of something you’ve built
              are awesome. You don’t need a polished set of slides!
            </p>
          </React.Fragment>
        )}
      </Bubble>
      <Speaker arrowPosition={arrowPosition}>
        {slot ? (
          <React.Fragment>
            <div style={{ fontWeight: 500 }}>{slot.speaker.name}</div>
            <div>{slot.speaker.occupation}</div>
            {slot.speaker.socialName && slot.speaker.socialUrl && (
              <div>
                <Link href={slot.speaker.socialUrl}>
                  {slot.speaker.socialName}
                </Link>
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>This might be you 👍</React.Fragment>
        )}
      </Speaker>
    </Container>
  )
}

export default Talk
