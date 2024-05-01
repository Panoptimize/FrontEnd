import React from 'react';
import { IButton } from './types';
import './Button.css';

const Button: React.FC<IButton> = ({ text, bold, baseColor, image, inverted }) => {
  return (
    <>
      <button 
        className={`btn-${baseColor}${bold?'-bold':''} ${text ? 'pr-4':''} ${image && text ? 'pl-1':''} ${!image ? 'pl-4 py-2':''} `}
      >
      <div className='flex items-center' style={{ filter: `invert(${inverted}%)` }}>
        {image && <img src={require(`../../assets/images/${image}.png`)} alt={image}></img>}
        {text}
      </div>
      </button>
    </>
  );
};

export default Button;
