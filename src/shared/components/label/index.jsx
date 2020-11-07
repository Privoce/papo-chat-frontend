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

  function isValidURL(string) {
    if (typeof string !== 'string') {
      return string;
    }
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res !== null;
  }

  function drawText(string) {
    if (!string || !Number.isNaN(string)) {
      return string;
    }

    if (isValidURL(string)) {
      // get the start of url (http(s) or www)

      const start =
        string.search('http') > 0
          ? string.search('http')
          : string.search('www');

      // get the end of url: the blank space after url
      const end =
        string.slice(start).search(' ') > 1
          ? string.slice(start).search(' ')
          : string.length;

      const url = string.slice(start, end + start);

      const normalText = string.split(url);

      return (
        <>
          {normalText[0]}
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
          {normalText[1]}
        </>
      );
    }

    return string;
  }

  return (
    <span className={spanClassName} style={spanStyles}>
      {drawText(text)}
    </span>
  );
}

export default LabelComponent;
