import React, { ReactNode } from 'react';
import { IFlexHolder } from './types';

const FlexHolder: React.FC<IFlexHolder> = ({ components, border }) => (
    <div className="flex flex-auto px-3 rounded-3xl overflow-hidden bg-white" style={{overflowX: 'scroll', border: border ? '1px solid rgba(128, 128, 128, 0.25)' : 'none'}}>
        <div className="flex space-x-4">
            {components.map((component, index) => (
                <div className='mx-2' key={index}>
                        {component}
                </div>
            ))}
        </div>
    </div>
);

export default FlexHolder;
