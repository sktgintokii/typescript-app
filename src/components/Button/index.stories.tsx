import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs'
import Button from '.';

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);

stories.add(
  'Button',
  () =>
    <Button onClick={action('onClick')}>
      {text('Label', 'Click Me!')}
    </Button>,
);
