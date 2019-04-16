import { storiesOf } from '@storybook/react'
import React from 'react'
import LoadingIndicator from './LoadingIndicator'

storiesOf('LoadingIndicator', module).add('Default', () => (
  <LoadingIndicator defer={0} />
))
