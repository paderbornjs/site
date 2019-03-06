import React from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { OrganizersQueryOrganizers } from '../../typings/generated.d'
import Link from '../Link'
import { LinkWrapper, Name, Text, TwitterLogo } from './OrganizerCard.style'

export interface Props {
  itemIndex: number
  organizer: OrganizersQueryOrganizers
}

const offsetHorizontal = 4
const offsetVertical = 2

const Use = styled(props => <use {...props} />)`
  width: calc(100% + 2 * ${offsetHorizontal}px);
  height: calc(100% + 2 * ${offsetVertical}px);
  position: absolute;
  top: -${offsetVertical}px;
  left: -${offsetHorizontal}px;
  mix-blend-mode: soft-light;
  opacity: 0;

  &:nth-child(1) {
    opacity: 1;
  }

  &:nth-child(2) {
    mix-blend-mode: color;
  }

  &:nth-child(3) {
    background-color: rgba(255, 255, 255, 1);
    mix-blend-mode: exclusion;
  }
`

const glitchAnimation1 = keyframes`
	0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); }
	2% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); }
	4% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
	6% { clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%); }
	8% { clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%); }
	10% { clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%); }
	12% { clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%); }
	14% { clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%); }
	16% { clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%); }
	18% { clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); }
	20% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }
  22%, 100% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }`

const glitchAnimation2 = keyframes`
	0% { clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%); }
	3% { clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%); }
	5% { clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); }
	7% { clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%); }
	9% { clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%); }
	11% { clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%); }
	13% { clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%); }
	15% { clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%); }
	17% { clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%); }
	19% { clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%); }
	20% { clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%); }
	22%, 100% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }`

const glitchAmimation3 = keyframes`
	0% { clip-path: polygon(0 1%, 100% 1%, 100% 3%, 0 3%); }
	1.5% { clip-path: polygon(0 10%, 100% 10%, 100% 9%, 0 9%); }
	2% { clip-path: polygon(0 5%, 100% 5%, 100% 6%, 0 6%); }
	2.5% { clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%); }
	3% { clip-path: polygon(0 10%, 100% 10%, 100% 10%, 0 10%); }
	5% { clip-path: polygon(0 30%, 100% 30%, 100% 25%, 0 25%); }
	5.5% { clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%); }
	7% { clip-path: polygon(0 40%, 100% 40%, 100% 39%, 0 39%); }
	8% { clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%); }
	9% { clip-path: polygon(0 60%, 100% 60%, 100% 55%, 0 55%); }
	10.5% { clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%); }
	11% { clip-path: polygon(0 70%, 100% 70%, 100% 69%, 0 69%); }
	13% { clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%); }
	14% { clip-path: polygon(0 80%, 100% 80%, 100% 75%, 0 75%); }
	14.5% { clip-path: polygon(0 50%, 100% 50%, 100% 51%, 0 51%); }
	15% { clip-path: polygon(0 90%, 100% 90%, 100% 90%, 0 90%); }
	16% { clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%); }
	18% { clip-path: polygon(0 100%, 100% 100%, 100% 99%, 0 99%); }
	20% { clip-path: polygon(0 70%, 100% 70%, 100% 71%, 0 71%); }
  22%, 100% { clip-path: polygon(0 0, 0 0, 0 0, 0 0); }`

const exclusionAnimation = keyframes`
	0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); }
	3% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); }
	17% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); }
	20% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
	26% { clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%); }
	32% { clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%); }
	50% { clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%); }
	55% { clip-path: polygon(0 92%, 100% 92%, 100% 94%, 0 94%); }
	60% { clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%); }
	80% {	clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%); }
	90% {	clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%); }
	100% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); }`

const Gradient = styled.rect`
  opacity: 0;
`

const Svg = styled.svg<{ itemIndex: number }>`
  width: 160px;
  height: 160px;
  z-index: 1;

  @media (min-width: 550px) and (max-width: 767px) {
    // medium
    width: 200px;
    height: 200px;
  }

  @media (min-width: 768px) {
    // large
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    width: 260px;
    height: 260px;
  }

  ${props => (props.itemIndex % 2 === 0 ? 'left: 0px' : 'right: 0px')};

  &:hover ${Use} {
    opacity: 1;
  }
  &:hover ${Gradient} {
    opacity: 0.35;
  }
  &:hover ${Use}:nth-child(2) {
    left: 2px;
    animation: ${glitchAnimation1} 2s infinite linear alternate-reverse;
  }
  &:hover ${Use}:nth-child(3) {
    left: 2px;
    opacity: 0.3;
    animation: ${exclusionAnimation} 4s infinite linear alternate-reverse;
  }
  &:hover ${Use}:nth-child(4) {
    left: -2px;
    animation: ${glitchAnimation2} 3s infinite linear alternate-reverse;
  }
  &:hover ${Use}:nth-child(5) {
    left: -2px;
    animation: ${glitchAmimation3} 3s infinite linear alternate-reverse;
  }
`

const OrganizerCard: React.FunctionComponent<Props> = ({
  itemIndex,
  organizer: {
    name,
    description,
    twitter: { name: handle, profileImageUrl },
  },
}) => {
  return (
    <>
      <Svg
        viewBox="-2 0 102 103"
        preserveAspectRatio="xMidYMid slice"
        itemIndex={itemIndex}
      >
        <defs>
          <mask id="clipping">
            <rect width="100%" height="100%" />
            <path
              fill="#fff"
              transform={`scale(${100 / 173.20508075688772} 0.5)`}
              d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
            />
          </mask>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
          <image
            id={`image-${itemIndex}`}
            href={profileImageUrl}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="#82bfb7"
          mask="url(#clipping)"
          transform="translate(0 1) rotate(1)"
        />
        <g mask="url(#clipping)">
          <Use href={`#image-${itemIndex}`} />
          <Use href={`#image-${itemIndex}`} />
          <Use href={`#image-${itemIndex}`} />
          <Use href={`#image-${itemIndex}`} />
          <Use href={`#image-${itemIndex}`} />
          <Use href={`#image-${itemIndex}`} />
        </g>
        <Gradient
          width="100%"
          height="100%"
          fill="url(#gradient)"
          mask="url(#clipping)"
          opacity="0.25"
        />
      </Svg>
      <Text itemIndex={itemIndex}>
        <Name>{name}</Name>
        <LinkWrapper>
          <Link href={`http://twitter.com/${handle}`}>
            <TwitterLogo />
            {handle}
          </Link>
        </LinkWrapper>
        <p>{description}</p>
      </Text>
    </>
  )
}

export default OrganizerCard
