import React, { ReactNode } from "react";

export interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
}

export const Button: React.SFC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>
    {children}
  </button>
)

export default Button
