import React from 'react';

export default function Loading({ message = 'Loading...' }) {
  return (
    <div className="w-full min-h-[240px] flex items-center justify-center">
      <div className="rounded-3xl bg-white px-8 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
        <div className="mx-auto mb-4 h-10 w-10 rounded-full border-4 border-[#fee2e2] border-t-[#c1122f] animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500">{message}</p>
      </div>
    </div>
  );
}
