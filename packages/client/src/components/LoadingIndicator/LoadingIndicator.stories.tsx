import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import LoadingIndicator from './LoadingIndicator'

storiesOf('LoadingIndicator', module)
  .addDecorator(centered)
  .add('Default', () => <LoadingIndicator defer={0} />)
