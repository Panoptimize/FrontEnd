import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-14 h-screen content-center justify-center bg-teal-100 flex transition ease-in-out delay-150 hover:w-40 duration-300">
      <div className="flex flex-col">
        <div className="mt-1 mb-4 h-20 w-14 hover:w-36 bg-blue-700 hover:bg-blue-950">
          PZ
        </div>
        <div className="mb-3 h-14 w-14 hover:w-36 bg-amber-700 hover:bg-amber-950">
          OV
        </div>
        <div className="my-1 h-14 w-14 hover:w-36 bg-pink-600 hover:bg-pink-900">
          DB
        </div>
        <div className="my-1 h-14 w-14 hover:w-36 bg-pink-600 hover:bg-pink-900">
          AC
        </div>
        <div className="my-1 h-16 w-14 hover:w-36 bg-pink-600 hover:bg-pink-900">
          AG
        </div>
        <div className="my-1 h-16 w-14 hover:w-36 bg-pink-600 hover:bg-pink-900">
          HS
        </div>
        <div className="mt-32 h-16 w-14 hover:w-36 bg-green-600 hover:bg-green-900">
          AJ
        </div>
        <div className="mt-1 h-16 w-14 hover:w-36 bg-green-600 hover:bg-green-900">
          LG
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
