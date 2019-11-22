import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import * as React from 'react'
import Button from '.'

export default {
  component: Button,
  decorators: [withKnobs],
  title: 'Base/Button'
}

export const standard = () => (
  <Button onClick={action('onClick')}>{text('Label', 'Click Me!')}</Button>
)
