import { LOADING, TOGGLE_DRAFTS } from "../constants.js";

const d = new Date();
const hours = d.getHours();
const night = hours >= 20 || hours <= 7;

const initialState = {
  showDrafts: false,
  loading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAFTS:
      return {
        ...state,
        showDrafts: !state.showDrafts,
      };
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      return state;
  }
};

export default globalReducer;
