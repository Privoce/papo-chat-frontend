import React, { Component } from 'react';

import { InputComponent, IconComponent } from 'shared/components';
import _ from 'lodash';

export default class InputSearchComponent extends Component {
  debounceChange = _.debounce(value => {
    const { handleChange } = this.props;

    handleChange(value);
  }, 300);

  componentWillUnmount() {
    this.debounceChange.cancel();
  }

  render() {
    return (
      <InputComponent
        iconRight
        type="text"
        placeholder="Search..."
        autoComplete="off"
        onChange={event => {
          const { value } = event.target;
          this.debounceChange(value);
        }}
        maxLength={12}
        search
        iconComponent={() => {
          return (
            <IconComponent
              fill="#4064D1"
              icon="search"
              width={28}
              height={28}
              margin="0px 0px 0px 2px"
            />
          );
        }}
      />
    );
  }
}
