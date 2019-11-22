import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

it('renders welcome message', () => {
  const { getByText } = render(<App />)
  expect(getByText('Learn React')).toBeInTheDocument()
})
