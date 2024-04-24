import React from 'react';
import { IButton } from './types';
import './Button.css';

const Button: React.FC<IButton> = ({ text, bold, baseColor, image }) => {
  return (
    <>
      <button 
        className={`btn-${baseColor}${bold?'-bold':''} ${text ? 'px-4':''} ${!image ? 'py-2':''}`}
        
      >
        {image && <img src={require(`../../Images/${image}.png`)} alt={image} 
        style={baseColor == 'transparent' ? {filter: 'invert(100%)'} : {} }></img>}
        {text}
      </button>
    </>
  );
};

export default Button;
