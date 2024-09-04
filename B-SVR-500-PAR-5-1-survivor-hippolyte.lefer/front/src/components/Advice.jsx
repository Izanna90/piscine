import React from 'react';
import Sidebar from './Sidebar';

const tips = [
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
  "A super tip to help the coach with their customers",
];

const Tips = () => {
  return (
    <div className='flex h-screen w-screen'>
    <Sidebar></Sidebar>
    <div className="h-screen w-full p-8 bg-white text-black">
      {/* Header */}
      <div className="mb-6 border-b-2 border-black">
        <h1 className="text-3xl mb-4">Tips</h1>
      </div>

      {/* Grid of Tips */}
      <div className="grid grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 flex items-center justify-center">
            <p className="text-center">{tip}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Tips;
