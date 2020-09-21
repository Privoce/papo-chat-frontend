/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as drawerActions from 'redux/actions/drawer';
import ButtonComponent from 'shared/components/button';
import IconComponent from 'shared/components/icon';
import LabelComponent from 'shared/components/label';

function DrawerComponent({ drawerName, children, title }) {
  const dispatch = useDispatch();
  const drawerData = useSelector((state) => state.drawer);

  useEffect(() => {
    dispatch(drawerActions.initDrawer(drawerName));
  }, []);

  function handleGoBack() {
    dispatch(drawerActions.closeDrawer(drawerName));
  }

  const { isOpen } = drawerData[drawerName]
    ? drawerData[drawerName]
    : { isOpen: false };

  const drawerStyles = classNames({
    drawer: true,
    open: isOpen,
  });

  return (
    <div className={drawerStyles}>
      {isOpen ? (
        <div className="drawer-container">
          <header className="header">
            <ButtonComponent
              type="button"
              width={26}
              height={26}
              link
              onClick={handleGoBack}
            >
              <IconComponent
                fill="#ffffff"
                icon="arrow-left"
                width={26}
                height={26}
              />
            </ButtonComponent>
            <LabelComponent
              fontSemiBold
              defaultLabel
              text={title}
              fontSize={16}
              margin="0px 0px 3px 15px"
              headerTitle
            />
          </header>
          {children}
        </div>
      ) : null}
    </div>
  );
}

DrawerComponent.propTypes = {
  drawerName: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default DrawerComponent;
