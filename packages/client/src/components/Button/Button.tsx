import React, { useState } from 'react'

interface ButtonProps {
  text: string
}

const Button: React.SFC<ButtonProps> = ({ text }) => {
  const [toggled, setToggled] = useState(false)
  const handleClick = () => setToggled(toggled => !toggled)

  return (
    <button onClick={handleClick}>
      {text} {toggled ? 'on' : 'off'}
    </button>
  )
}

export default Button
