"use client"
import React, { useState } from 'react';

function TestComponent() {
  const [val, setVal] = useState({code : 0 , msg : "" });
  if(val.code)console.log("True when code = 0")

  return (
    <div>
      Hi
      </div>
  );
}

export default TestComponent;
