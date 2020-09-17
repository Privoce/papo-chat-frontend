/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { Manager, Reference, Popper } from 'react-popper';

import ButtonComponent from 'shared/components/button';
import IconComponent from 'shared/components/icon';
import LabelComponent from 'shared/components/label';

const DropDownMenuComponent = ({ onChange, options, icon, marginButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownWrapper = useRef(null);

  function changeDropDownStatus(toggle, newIsOpen) {
    const isOpenState = toggle ? !isOpen : newIsOpen;

    if (onChange) {
      onChange(isOpenState);
    }

    setIsOpen(isOpenState);
  }

  DropDownMenuComponent.handleClickOutside = (event) => {
    if (dropDownWrapper.current) {
      if (!dropDownWrapper.current.contains(event.target)) {
        if (isOpen) {
          changeDropDownStatus(false, false);
        }
      }
    }
  };

  return (
    <div ref={dropDownWrapper} className="drop-down-menu-wrapper">
      <Manager>
        <Reference>
          {({ ref }) => (
            <ButtonComponent
              type="button"
              width={icon.width}
              height={icon.height}
              margin={marginButton}
              link
              setRef={ref}
              onClick={() => {
                changeDropDownStatus(true);
              }}
            >
              <IconComponent {...icon} />
            </ButtonComponent>
          )}
        </Reference>
        {isOpen && (
          <Popper placement="bottom-end">
            {({ ref, style, placement }) => (
              <div className="drop-down-menu fadeIn" style={style} ref={ref}>
                <div className="drop-down-container" data-placement={placement}>
                  <ul>
                    {options.map((item, index) => (
                      <li key={`alora-${index + 1}`}>
                        <ButtonComponent
                          link
                          onClick={() => {
                            changeDropDownStatus(false, false);
                            item.event();
                          }}
                        >
                          <LabelComponent
                            regular
                            dark
                            breakWord
                            alignCenter
                            text={item.text}
                            fontSize={14}
                          />
                        </ButtonComponent>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </Popper>
        )}
      </Manager>
    </div>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => DropDownMenuComponent.handleClickOutside,
};

DropDownMenuComponent.propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  icon: PropTypes.object,
  marginButton: PropTypes.number,
};

DropDownMenuComponent.defaultProps = {
  options: [],
  icon: {},
  marginButton: 0,
};

export default onClickOutside(DropDownMenuComponent, clickOutsideConfig);
