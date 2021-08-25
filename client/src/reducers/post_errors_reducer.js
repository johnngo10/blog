import { RECEIVE_NEW_POST_ERRORS } from "../actions/post_actions";

const _nullErrors = [];

const PostErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NEW_POST_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default PostErrorsReducer;
