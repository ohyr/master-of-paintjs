import React from 'react';
import './Paint.css';

function Paint() {
  return (
    <div className="paint">
      <header className="paint-title">
        <h1>Palette</h1>
      </header>
      <canvas className="canvas" />
      <div className="controls">
        <div className="controls__colors">
          <div className="controls__color controls__black" />
          <div className="controls__color controls__white" />
          <div className="controls__color controls__red" />
          <div className="controls__color controls__orange" />
          <div className="controls__color controls__yellow" />
          <div className="controls__color controls__green" />
          <div className="controls__color controls__skyblue" />
          <div className="controls__color controls__blue" />
          <div className="controls__color controls__purple" />
        </div>
      </div>
    </div>
  );
}

export default Paint;
