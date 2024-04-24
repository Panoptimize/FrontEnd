import React from 'react';
import { IButton } from './types';
import './Button.css';

const Button: React.FC<IButton> = ({ text, thickness, baseColor, image }) => {

  return (
    <>
      <button 
        className={'flex items-center bg-teal-600 hover:bg-teal-900 text-white rounded-xl'}>
        
        {image && <img src='https://img.icons8.com/ios/452/search--v1.png' alt={image} 
        style={baseColor == 'transparent' ? {filter: 'invert(100%)'} : {} }></img>}
        {text}
      </button>
    </>
  );
};

export default Button;