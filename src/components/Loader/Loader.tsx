import React from 'react';
import logo from '../../assets/images/PanoptimizeApp Transparent.png';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <img src={logo} alt="App Logo" className="animate-spin h-12 w-12" data-testid="loader" />
        </div>
    );
};

export default Loader;