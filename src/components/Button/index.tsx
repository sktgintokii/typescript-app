import React, { ReactNode } from 'react'

export interface ButtonProps {
  onClick?: () => void
  children?: ReactNode
}

const Button: React.SFC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>
}

export default Button
