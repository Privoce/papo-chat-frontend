import React from 'react';

import classNames from 'classnames';

function SketchComponent({ width, height, margin, circle, dark }) {
  const sketchStyles = classNames({
    sketch: true,
    circle,
    dark,
  });

  return (
    <div className="sketch-wrapper">
      <div
        className={sketchStyles}
        style={{
          width,
          height,
          margin,
        }}
      />
    </div>
  );
}

export default SketchComponent;
