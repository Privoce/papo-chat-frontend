import {
  POST_ADD_CONTACT,
  POST_ADD_CONTACT_RECEIVED,
  RESET_ADD_CONTACT,
  GET_CONTACTS,
  GET_CONTACTS_RECEIVED,
  RESET_GET_CONTACTS,
  DELETE_CONTACT,
  DELETE_CONTACT_RECEIVED,
  REMOVE_CONTACT,
} from 'redux/constants/contact';
import { RESET } from 'redux/constants/main';

const initialState = {
  addContact: {
    isFetching: false,
    errors: {},
    successMessages: [],
  },
  getContacts: {
    isFetching: false,
    result: [],
  },
  deleteContact: {
    isFetching: false,
    currentContactIdIsDeleting: null,
  },
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        getContacts: { ...state.getContacts, isFetching: true },
      };

    case GET_CONTACTS_RECEIVED:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          isFetching: false,
          ...action.params,
        },
      };

    case RESET_GET_CONTACTS:
      return {
        ...state,
        getContacts: { ...state.getContacts, isFetching: false, result: [] },
      };

    case POST_ADD_CONTACT:
      return {
        ...state,
        addContact: { ...state.addContact, isFetching: true },
      };

    case POST_ADD_CONTACT_RECEIVED:
      return {
        ...state,
        addContact: {
          ...state.addContact,
          isFetching: false,
          ...action.params,
        },
      };

    case DELETE_CONTACT:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          isFetching: true,
          currentContactIdIsDeleting: action.params.contactId,
        },
      };

    case DELETE_CONTACT_RECEIVED:
      return {
        ...state,
        deleteContact: {
          ...state.deleteContact,
          isFetching: false,
          currentContactIdIsDeleting: null,
        },
      };

    case RESET_ADD_CONTACT:
      return {
        ...state,
        addContact: {
          ...state.addContact,
          isFetching: false,
          errors: {},
          successMessages: [],
        },
      };

    case REMOVE_CONTACT:
      return {
        ...state,
        getContacts: {
          ...state.getContacts,
          result: state.getContacts.result.filter(
            (item) => item._id !== action.params.contactId
          ),
        },
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
