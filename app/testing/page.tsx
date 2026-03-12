'use client';

import { useState } from 'react';

export default function Testing() {
  const [open, setOpen] = useState(false);
  const numberOfGrid = [1, 2, 3, 4, 5];

  function giveModal() {
    return (
      <div className="absolute top-30">
        {' '}
        VARIABEL HER
        <p>This is my modal</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {numberOfGrid.map((item, index) => (
          <li key={index} className="w-full bg-amber-200 h-5 relative">
            {item}
          </li>
        ))}
        {open ? giveModal() : ''}
      </ul>

      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="bg-amber-700 border shadow-2xl "
      >
        Give overlay
      </button>
    </div>
  );
}
