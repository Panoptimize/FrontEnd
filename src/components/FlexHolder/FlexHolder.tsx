import React, { ReactNode } from 'react';
import { IFlexHolder } from './types';

const FlexHolder: React.FC<IFlexHolder> = ({ components }) => (
    <div className="w-full h-full overflow-hidden bg-white m-0" style={{ width: '150px', height: '85px', border: '1px solid rgba(128, 128, 128, 0.5)', overflowX: 'scroll' }}>
        <div className="flex space-x-4">
            {components.map((component, index) => (
                <React.Fragment key={index}>
                    {component}
                </React.Fragment>
            ))}
        </div>
    </div>
);

export default FlexHolder;

