import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Link from './Link'

storiesOf('Link', module).add('Default', () => (
  <Link onClick={action('click')}>Link text</Link>
))
