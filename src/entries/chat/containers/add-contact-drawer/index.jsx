import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  InputComponent,
  ButtonComponent,
  FormComponent,
  FlashMessageComponent,
} from 'shared/components';

import constants from 'modules/constants';
import * as contactActions from 'redux/actions/contact';

function AddContactDrawer() {
  const dispatch = useDispatch();

  const contactData = useSelector((state) => state.contact);

  function onCloseFlashMessage() {
    const { resetAddContact } = contactActions;

    resetAddContact();
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
            nickname: '',
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
                {successMessages.nickname ? (
                  <FlashMessageComponent
                    width="100%"
                    message={successMessages.nickname}
                    margin="0px 0px 15px 0px"
                    onClose={onCloseFlashMessage}
                    success
                  />
                ) : null}
                {errors.nickname ? (
                  <FlashMessageComponent
                    width="100%"
                    message={errors.nickname}
                    margin="0px 0px 15px 0px"
                    onClose={onCloseFlashMessage}
                    error
                  />
                ) : null}
                <InputComponent
                  name="nickname"
                  type="text"
                  autoComplete="off"
                  placeholder={constants.LABELS.AUTH.NICKNAME}
                  onChange={handleChange}
                  maxLength={12}
                  defaultButton
                  margin="0px 0px 15px 0px"
                />
                <ButtonComponent
                  type="submit"
                  primary
                  text={constants.LABELS.CHAT.ADD}
                  width="100%"
                  disabled={!values.nickname}
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
