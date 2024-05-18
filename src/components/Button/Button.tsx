import React from 'react';
import { IButton } from './types';
import './Button.css';

const Button: React.FC<IButton> = ({ text, bold, baseColor, image, inverted, method }) => {
  // Using only SVG files for icons
  const isSvg = image?.endsWith('.svg');
  if (!isSvg) {
    console.error('Only SVG files are supported for the image prop.');
    return null;
  }

  return (
    <button 
      className={`btn-${baseColor}${bold ? '-bold' : ''} ${text ? 'pr-4' : ''} ${image && text ? 'pl-1' : ''} ${!image ? 'pl-4 py-2' : ''}`}
      onClick={method}
    >
      <div className={`flex items-center ${baseColor !== 'transparent' ? 'text-white' : 'text-black'}`} style={{filter: `invert(${inverted})`}}>
        {image && (
          <img
            // Work only with SVG files
            src={require(`../../assets/images/${image}`)}
            //src={require(`../../assets/images/${image}${isSvg ? '' : '.png'}`)}
            alt={image}
          />
        )}
        {text}
      </div>
    </button>
  );
};

export default Button;
