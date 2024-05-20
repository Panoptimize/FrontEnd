import React, { ReactNode } from 'react';
import { IFlexHolder } from './types';

const FlexHolder: React.FC<IFlexHolder> = ({ components }) => (
    <div className="w-full h-full overflow-hidden bg-white m-0">
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
