/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';

import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';

import {
  UserInfoComponent,
  InputSearchComponent,
} from 'entries/chat/components';
import {
  ConversationsList,
  AddContactDrawer,
  StartConversationDrawer,
} from 'entries/chat/containers';
import constants from 'modules/constants';
import {
  logout,
  searchParam,
  getUser,
  setConversationLastMessageDateTime,
} from 'modules/utils';
import * as contactActions from 'redux/actions/contact';
import * as conversationActions from 'redux/actions/conversation';
import * as drawerActions from 'redux/actions/drawer';
import {
  IconComponent,
  ButtonComponent,
  DrawerComponent,
  DropDownMenuComponent,
  LabelComponent,
} from 'shared/components';

function ActionsWrapper() {
  const [conversationsSearch, setConversationsSearch] = useState({
    nickname: '',
  });
  const dispatch = useDispatch();
  const conversationData = useSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(conversationActions.getConversations());
  }, []);

  function openDrawer(drawerName) {
    dispatch(contactActions.resetAddContact());
    dispatch(drawerActions.openDrawer(drawerName));
  }

  function handleOpenAddContact() {
    contactActions.resetAddContact();
    openDrawer('addContact');
  }

  function handleOpenNewConversation() {
    openDrawer('newConversation');
  }

  function handleLogout() {
    logout();
  }

  function handleChangeSearch(value) {
    setConversationsSearch({ nickname: value });
  }

  function conversationListToComponentData(conversations) {
    const { currentPartnerIdConversation } = conversationData;

    const { deleteConversation } = conversationData;

    return conversations.map((item) => {
      const { nickname, profileColor, _id } = item.partnerId;

      const { unreadMessages, _id: conversationId } = item;

      const lastMessage = item.messages[item.messages.length - 1];

      return {
        nickname,
        profileColor,
        _id,
        conversationId,
        desc: lastMessage ? lastMessage.message : '',
        rightLabel: lastMessage
          ? setConversationLastMessageDateTime(lastMessage.dateTime)
          : '',
        unreadMessages,
        active:
          String(item.partnerId._id) === String(currentPartnerIdConversation),
        isFetchingAction:
          deleteConversation.isFetching &&
          String(deleteConversation.currentPartnerIdIsDeleting) === _id,
      };
    });
  }

  function handleClickConversationItem(item) {
    dispatch(
      conversationActions.setCurrentConversation({
        partner: item,
      })
    );
  }

  function handleDeleteConversation(item) {
    const { _id } = item;

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm-popup">
            <LabelComponent
              fontSemiBold
              text={constants.LABELS.CHAT.DELETE_CHAT_CONFIRM}
              fontSize={30}
              alignCenter
              margin="0px 0px 25px 0px"
            />
            <div className="buttons-container">
              <ButtonComponent
                type="button"
                defaultButton
                small
                outline
                text={constants.LABELS.MAIN.NO}
                margin="10px"
                width={100}
                onClick={onClose}
              />
              <ButtonComponent
                type="button"
                defaultButton
                small
                outline
                text={constants.LABELS.MAIN.YES}
                margin="10px"
                width={100}
                onClick={() => {
                  dispatch(
                    conversationActions.deleteConversation({
                      partnerId: _id,
                    })
                  );
                  onClose();
                }}
              />
            </div>
          </div>
        );
      },
    });
  }

  const currentUser = getUser() || {};

  const { isFetching, result } = conversationData;

  const { profileColor, nickname } = currentUser;

  const conversations = conversationListToComponentData(result);
  const items = searchParam(conversations, conversationsSearch);

  return (
    <div className="actions-wrapper">
      <header className="header-container">
        <div className="header-content">
          <UserInfoComponent
            isFetching={false}
            column
            profile={{
              label: nickname,
              width: 60,
              height: 60,
              backgroundColor: profileColor,
              color: 'white',
              labelFontSize: 16,
            }}
            title={{
              text: nickname,
              fontSize: 16,
              margin: '10px 0px 0px 0px',
            }}
          />
          <div>
            <ButtonComponent
              type="button"
              width={26}
              height={26}
              link
              onClick={handleOpenAddContact}
            >
              <IconComponent
                fill="#555657"
                icon="account-plus"
                width={26}
                height={26}
              />
            </ButtonComponent>
            <ButtonComponent
              type="button"
              width={26}
              height={26}
              margin="0px 0px 0px 20px"
              link
              onClick={handleOpenNewConversation}
            >
              <IconComponent
                fill="#555657"
                icon="message-text"
                width={26}
                height={26}
              />
            </ButtonComponent>
            <DropDownMenuComponent
              options={[
                {
                  text: constants.LABELS.CHAT.LOGOUT,
                  event: handleLogout,
                },
              ]}
              icon={{
                fill: '#555657',
                icon: 'dots-vertical',
                width: 26,
                height: 26,
              }}
              marginButton="0px 0px 0px 20px"
            />
          </div>
        </div>
      </header>
      <div>
        <InputSearchComponent handleChange={handleChangeSearch} />
      </div>
      <ConversationsList
        items={items}
        isFetching={isFetching}
        emptyMessage={constants.LABELS.CHAT.NO_CONVERSATIONS_TO_SHOW}
        onClickItem={handleClickConversationItem}
        onDeleteItem={handleDeleteConversation}
        deleteDropDownMessage={constants.LABELS.CHAT.DELETE_CHAT}
      />
      <DrawerComponent
        drawerName="addContact"
        title={constants.LABELS.CHAT.ADD_CONTACT}
      >
        <AddContactDrawer />
      </DrawerComponent>
      <DrawerComponent
        drawerName="newConversation"
        title={constants.LABELS.CHAT.NEW_CONVERSATION}
      >
        <StartConversationDrawer drawerName="newConversation" />
      </DrawerComponent>
    </div>
  );
}

export default ActionsWrapper;
