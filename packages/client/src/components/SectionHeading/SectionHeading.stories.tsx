import centered from '@storybook/addon-centered/react'
import { storiesOf } from '@storybook/react'
import React from 'react'
import SectionHeading from './SectionHeading'

storiesOf('SectionHeading', module)
  .addDecorator(centered)
  .add('Default', () => <SectionHeading>Section Heading</SectionHeading>)
