import React from 'react'
import { render } from '../../testUtils'
import About from './About'

describe('<About />', () => {
  test('matches snapshot', () => {
    const { container } = render(<About />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
