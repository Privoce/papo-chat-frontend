import React from 'react';
import classNames from 'classnames';

function LoadingComponent({ defaultLoading, type }) {
  function renderSpinner() {
    return (
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
      </div>
    );
  }

  function renderDotnut() {
    const dotnutStyles = classNames({
      donut: true,
      default: defaultLoading,
    });

    return <div className={dotnutStyles} />;
  }

  switch (type) {
    case 'donut':
      return renderDotnut();

    case 'spinner':
      return renderSpinner();

    default:
      return renderSpinner();
  }
}

export default LoadingComponent;
