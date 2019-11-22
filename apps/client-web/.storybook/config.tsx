import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { GlobalStyle } from '../src/shared/global'

addDecorator(withA11y)
addDecorator(story => (
  <>
    <GlobalStyle />
    {story()}
  </>
));

// automatically import all files ending in *.stories.(tsx|jsx)
configure(require.context('../src', true, /\.stories\.[tj]sx?$/), module);
