'use client';

import { useState } from 'react';

type Props = {
  plusWith: number;
};

export function ThisIsInfo({ plusWith }: Props) {
  const [viewInfo, setViewInfo] = useState(2);

  function plusOne() {
    setViewInfo(viewInfo + plusWith);
  }

  return (
    <div>
      <button onClick={plusOne}>Plus one</button>
      {viewInfo}
    </div>
  );
}
