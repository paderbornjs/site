import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Link from './Link'

storiesOf('Link', module)
  .addDecorator(centered)
  .add('Default', () => <Link>Link text</Link>)
