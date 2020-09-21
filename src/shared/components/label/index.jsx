import React from 'react';

import classNames from 'classnames';

function LabelComponent({
  text,
  danger,
  fontSize,
  defaultLabel,
  dark,
  fontBold,
  fontSemiBold,
  fontMedium,
  fontRegular,
  margin,
  breakWord,
  maxWidth,
  alignCenter,
  alignRight,
  width,
  headerTitle,
}) {
  const spanClassName = classNames({
    label: true,
    fadeIn: true,
    danger,
    dark,
    headerTitle,
    'font-bold': fontBold,
    'font-semi-bold': fontSemiBold,
    'font-medium': fontMedium,
    'font-regular': fontRegular,
    'break-word': breakWord,
    'align-center': alignCenter,
    'align-right': alignRight,
    default: defaultLabel,
  });

  const spanStyles = {
    margin,
    fontSize,
    maxWidth,
    width,
  };

  return (
    <span className={spanClassName} style={spanStyles}>
      {text}
    </span>
  );
}

export default LabelComponent;
