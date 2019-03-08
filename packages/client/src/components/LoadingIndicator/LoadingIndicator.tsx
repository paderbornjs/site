import React, { useEffect, useState } from 'react'
import { Ball, BallContainer } from './LoadingIndicator.style'

interface Props {
  defer?: number
}

const LoadingIndicator: React.FunctionComponent<Props> = ({ defer = 500 }) => {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setDisplay(true), defer)
    return () => window.clearTimeout(timer)
  })

  return defer === 0 || display ? (
    <BallContainer>
      <Ball index={0} />
      <Ball index={1} />
      <Ball index={2} />
    </BallContainer>
  ) : null
}

export default LoadingIndicator
