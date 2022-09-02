import React, { ButtonHTMLAttributes } from 'react'
import './styles.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return <button className='button' type="submit" {...rest}>{text}</button>;
};

export default Button