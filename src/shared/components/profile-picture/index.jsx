import React from 'react';

import classNames from 'classnames';

import { createAcronym } from 'modules/utils';
import LabelComponent from 'shared/components/label';

function ProfilePictureComponent({
  color,
  backgroundColor,
  label,
  width,
  height,
  labelFontSize,
}) {
  const profilePictureStyles = classNames({
    'profile-picture': true,
    fadeIn: true,
  });

  return (
    <div
      className={profilePictureStyles}
      style={{
        backgroundColor,
        color,
        width,
        height,
      }}
    >
      <LabelComponent
        fontBold
        text={createAcronym(label)}
        fontSize={labelFontSize}
      />
    </div>
  );
}

export default ProfilePictureComponent;
