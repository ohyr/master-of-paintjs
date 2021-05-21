import React from 'react';
import './Paint.css';

function Paint() {
  return (
    <div className="paint">
      <header className="paint-title">
        <h1>Palette</h1>
      </header>
      <canvas className="canvas" />
    </div>
  );
}

export default Paint;
