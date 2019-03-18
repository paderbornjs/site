import React from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components/macro'
import { EventsQueryUpcomingEvents } from '../../typings/generated.d'
import Link from '../Link'

const Description = styled(Markdown)`
  margin: 2.4rem 0 0 0;
  text-align: left;

  p {
    margin: 0;
  }
`

const Title = styled.h3`
  margin: 0 0 2.4rem 0;
  font-weight: 500;
`

const Emphasize = styled.em`
  font-style: normal;
  font-weight: 500;
`

const CallToAction = styled(Link)`
  padding: 1rem 2rem;
  background: green;

  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    color: white;
  }

  &::before,
  &::after {
    content: none;
  }
`

const Slots = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 10px 0;
  list-style-type: none;

  @media (min-width: 768px) {
    margin: 16px 0;
  }
`

const Slot = styled.li`
  background: #e9f2f5;
  padding: 1.3rem;
  text-align: center;
  position: relative;
  margin-bottom: 4rem;
  min-width: 100%;

  &:first-child {
    &::before {
      transform: skewY(-1deg);
      top: -4px;
    }

    &::after {
      transform: skewY(-1deg);
      bottom: -10px;
    }
  }

  &:last-child {
    margin-bottom: 0;

    &::before {
      top: -15px;
      transform: skewY(-1deg);
    }

    &::after {
      bottom: -7px;
      transform: skewY(1deg);
    }
  }

  &::before,
  &::after {
    content: '';
    background: inherit;
    position: absolute;
    z-index: -1;
    border: 0;
    height: 50px;
    left: 0;
    right: 0;
  }

  @media (min-width: 768px) {
    min-width: 49%;
    width: 49%;
    margin-bottom: 0;

    &:first-child {
      margin-right: 2%;

      &::before {
        transform: skewY(-1deg);
        top: -4px;
      }

      &::after {
        transform: skewY(1deg);
        bottom: -4px;
      }
    }

    &:last-child {
      &::before {
        top: -12px;
        transform: skewY(-1deg);
      }

      &::after {
        bottom: -12px;
        transform: skewY(1deg);
      }
    }
  }
`

export interface EventProps {
  event: EventsQueryUpcomingEvents
  slotCount?: number
}

interface Slot {
  component: JSX.Element
  free: boolean
}

const FreeSlot: React.FC = () => (
  <React.Fragment>
    <Title>Free slot!</Title>
  </React.Fragment>
)

interface LinkRendererProps {
  href: string
}

const LinkRenderer: React.FC<LinkRendererProps> = props => <Link {...props} />

// @todo free slot if less than 2 talks
const EventDetails: React.FC<EventProps> = ({
  event: { date, goingCount, url, talks },
  slotCount = 2,
}) => {
  const slots: Slot[] = talks.map(talk => ({
    component: (
      <React.Fragment>
        <Title>{talk.title}</Title>
        <img
          src={talk.speaker.avatarUrl}
          alt={talk.speaker.name}
          style={{ width: 100, height: 100, border: '4px solid white' }}
        />
        <div style={{ fontWeight: 500 }}>{talk.speaker.name}</div>
        <div>{talk.speaker.occupation}</div>
        {talk.speaker.socialName && talk.speaker.socialUrl && (
          <div>
            <Link href={talk.speaker.socialUrl}>{talk.speaker.socialName}</Link>
          </div>
        )}
        <Description
          source={talk.description}
          skipHtml={true}
          renderers={{
            link: LinkRenderer,
          }}
        />
      </React.Fragment>
    ),
    free: false,
  }))

  if (slots.length < slotCount) {
    for (let x = slots.length; x < slotCount; x++) {
      slots.push({ component: <FreeSlot />, free: true })
    }
  }

  return (
    <li>
      <div data-underline="transparent">
        Next Meetup on{' '}
        <Emphasize>
          {new Date(date).toLocaleString('en-us', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Emphasize>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '5rem',
        }}
      >
        <CallToAction href={url}>Are you going? ({goingCount})</CallToAction>
      </div>
      <div>Upcoming Talks</div>
      <Slots>
        {slots.map((slot, i) => (
          <Slot key={i}>{slot.component}</Slot>
        ))}
      </Slots>
    </li>
  )
}

export default EventDetails
