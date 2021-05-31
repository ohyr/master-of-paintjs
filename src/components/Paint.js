import React, { useState, useRef, useEffect } from 'react';
import './Paint.css';

const CANVAS_SIZE = 700;
const INITIAL_COLOR = 'black';
const INITIAL_LINE_WIDTH = 5.0;
const COLOR_LIST = [
  'black',
  'white',
  '#ff3b30',
  '#ff9500',
  '#fc0',
  '#4cd963',
  '#5ac8fa',
  '#0579ff',
  '#5856d6',
];

function Paint() {
  const canvasRef = useRef();
  const contextRef = useRef();
  const curColorRef = useRef();
  const curLineWidthRef = useRef();

  const [ctx, setCtx] = useState();
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const context = canvas.getContext('2d');
    context.strokeStyle = INITIAL_COLOR;
    context.lineWidth = INITIAL_LINE_WIDTH;
    contextRef.current = context;

    curColorRef.current.style.backgroundColor = INITIAL_COLOR;

    curLineWidthRef.current.textContent = INITIAL_LINE_WIDTH;

    setCtx(context);
    return () => {};
  }, []);

  function startPainting() {
    setPainting(true);
  }

  function stopPainting() {
    setPainting(false);
  }

  function onPainting({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;

    if (ctx) {
      if (!painting) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

  function handleRangeChange({ nativeEvent }) {
    const size = nativeEvent.target.value;
    ctx.lineWidth = size;
    curLineWidthRef.current.textContent = size;
  }

  function handleColorClick({ nativeEvent }) {
    const color = window.getComputedStyle(nativeEvent.target).backgroundColor;
    ctx.strokeStyle = color;
    curColorRef.current.style.backgroundColor = color;
  }

  function handleFillClick() {
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = curColorRef.current.style.backgroundColor;
    ctx.fill();
  }

  function handleSaveClick() {
    const image = canvasRef.current.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'Mater_Of_PaintJS[🎨]';
    link.click();
  }

  return (
    <div className="paint">
      <header className="paint-title">
        <h1>Palette</h1>
      </header>
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startPainting}
        onMouseUp={stopPainting}
        onMouseMove={onPainting}
        onMouseLeave={stopPainting}
      />
      <div className="controls">
        <div className="controls__current">
          <div>Current Color : </div>
          <div className="current__color" ref={curColorRef} />
          <div className="controls__btns">
            <button
              className="btn__fill"
              type="button"
              onClick={handleFillClick}
            >
              Fill Palette
            </button>
          </div>
        </div>
        <div className="controls__current">
          <div>Current Line Width : </div>
          <div className="current__linewidth" ref={curLineWidthRef} />
        </div>
        <div className="controls__range">
          <input
            className="range__width"
            type="range"
            min="0.1"
            max="10.0"
            defaultValue="5.0"
            step="0.1"
            onInput={handleRangeChange}
          />
        </div>
        <div className="controls__colors">
          {COLOR_LIST.map(color => (
            <div
              className="controls__color"
              style={{ backgroundColor: `${color}` }}
              onClick={handleColorClick}
              aria-hidden="true"
              tabIndex="0"
              role="button"
            />
          ))}
        </div>
        <div className="controls__btns">
          <button type="button" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Paint;
