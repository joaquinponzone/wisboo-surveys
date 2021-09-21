import { GET_FORMS, GET_FORM, LOADING } from "../constants.js";

const initialState = {
  formsList: {
    forms: [],
    drafts: [],
  },
  formDetail: {},
};

const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORMS:
      return {
        ...state,
        formsList: action.payload,
      };
    case GET_FORM:
      return {
        ...state,
        formDetail: action.payload,
      };
    case LOADING:
      return {
        formsList: {
          forms: [],
          drafts: [],
        },
        formDetail: {},
      };
    default:
      return state;
  }
};

export default formsReducer;
