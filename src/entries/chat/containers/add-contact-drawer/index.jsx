import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import constants from 'modules/constants';
import * as contactActions from 'redux/actions/contact';
import {
  InputComponent,
  ButtonComponent,
  FormComponent,
  FlashMessageComponent,
} from 'shared/components';

function AddContactDrawer() {
  const dispatch = useDispatch();

  const contactData = useSelector((state) => state.contact);

  function onCloseFlashMessage() {
    const { resetAddContact } = contactActions;

    dispatch(resetAddContact());
  }

  const { addContact } = contactData;

  const { successMessages } = addContact;

  const { errors } = addContact;

  return (
    <div className="add-contact-drawer-wrapper">
      <div className="form-container">
        <FormComponent
          formName="AddContactForm"
          values={{
            email: '',
          }}
          handleSubmit={(values) => {
            if (!addContact.isFetching) {
              const params = {
                body: values,
              };

              dispatch(contactActions.postAddContact(params));
            }
          }}
          render={({ handleChange, handleSubmit, form }) => {
            const { values } = form;

            return (
              <form onSubmit={handleSubmit}>
                {successMessages.email ? (
                  <FlashMessageComponent
                    width="100%"
                    message={successMessages.email}
                    margin="0px 0px 15px 0px"
                    onClose={onCloseFlashMessage}
                    success
                  />
                ) : null}
                {errors.email ? (
                  <FlashMessageComponent
                    width="100%"
                    message={errors.email}
                    margin="0px 0px 15px 0px"
                    onClose={onCloseFlashMessage}
                    error
                  />
                ) : null}
                <InputComponent
                  name="email"
                  type="text"
                  autoComplete="off"
                  placeholder={constants.LABELS.AUTH.EMAIL}
                  onChange={handleChange}
                  maxLength={22}
                  defaultButton
                  margin="0px 0px 15px 0px"
                />
                <ButtonComponent
                  type="submit"
                  primary
                  text={constants.LABELS.CHAT.ADD}
                  width="100%"
                  disabled={!values.email}
                  isFetching={addContact.isFetching}
                />
              </form>
            );
          }}
        />
      </div>
    </div>
  );
}

export default AddContactDrawer;
