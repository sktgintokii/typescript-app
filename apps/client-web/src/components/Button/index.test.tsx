import React from 'react'
import renderer from 'react-test-renderer'
import Button from '.'

describe('Button', () => {
  test('Match snapshot', () => {
    const component = renderer.create(<Button>Click Me</Button>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
