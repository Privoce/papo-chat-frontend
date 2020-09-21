/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import classNames from 'classnames';

import { UserInfoComponent } from 'entries/chat/components';

function ConversationCardComponent({
  profile,
  title,
  desc,
  onClick,
  rightLabel,
  tagInfo,
  active,
  actions,
  isFetching,
  isFetchingAction,
}) {
  const conversationCardStyles = classNames({
    'conversation-card': true,
    active,
  });

  useEffect(() => {
    const activeElement = document.querySelector('.active');

    if (!activeElement) {
      return;
    }

    const prev = activeElement.previousElementSibling;
    const next = activeElement.nextElementSibling;

    const allTop = document.querySelector('.top-conner-radius');
    const allBottom = document.querySelector('.bottom-conner-radius');
    const allSearch = document.querySelector('.search-container-conner');

    if (allTop) {
      allTop.classList.remove('top-conner-radius');
    }
    if (allBottom) {
      allBottom.classList.remove('bottom-conner-radius');
    }
    if (allSearch) {
      allSearch.classList.remove('search-container-conner');
    }

    if (prev) {
      prev.classList.add('bottom-conner-radius');
    }

    if (prev === null) {
      const searchContainer = document.querySelector('.main-search-container');
      searchContainer.classList.add('search-container-conner');
    }

    if (next) {
      next.classList.add('top-conner-radius');
    }
  }, [active]);

  return (
    <div
      role="button"
      tabIndex="-1"
      className={conversationCardStyles}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick(event);
      }}
      onKeyDown={() => {}}
    >
      <div className="conversation-card--container">
        <UserInfoComponent
          profile={profile}
          title={title}
          desc={desc}
          rightLabel={rightLabel}
          wrapperStyle={{
            width: '100%',
            justifyContent: 'space-between',
          }}
          tagInfo={tagInfo}
          actions={actions}
          isFetching={isFetching}
          isFetchingAction={isFetchingAction}
        />
      </div>
    </div>
  );
}

export default ConversationCardComponent;
