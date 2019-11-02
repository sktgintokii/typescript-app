import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'
import Button from '.'

export default {
  title: 'Base/Button',
  component: Button,
  decorators: [withKnobs]
}

export const standard = () => (
  <Button onClick={action('onClick')}>{text('Label', 'Click Me!')}</Button>
)
