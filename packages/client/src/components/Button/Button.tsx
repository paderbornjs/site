import React, { useState } from 'react'

interface Props {
  text: string
}

const Button: React.FunctionComponent<Props> = ({ text }) => {
  const [toggled, setToggled] = useState(false)
  const handleClick = () => setToggled(toggled => !toggled)

  return (
    <button onClick={handleClick}>
      {text} {toggled ? 'on' : 'off'}
    </button>
  )
}

export default Button
