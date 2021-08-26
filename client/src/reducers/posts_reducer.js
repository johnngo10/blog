import {
  RECEIVE_POSTS,
  RECEIVE_USER_POSTS,
  RECEIVE_NEW_POST,
  RECEIVE_DELETE_POST,
  RECEIVE_POST,
  RECEIVE_NEW_COMMENT,
} from "../actions/post_actions";

const initialState = {
  all: [],
  user: {},
  newPosts: undefined,
  post: {},
  comment: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        all: action.payload,
      };
    case RECEIVE_USER_POSTS:
      return {
        ...state,
        user: action.payload,
      };
    case RECEIVE_NEW_POST:
      return {
        ...state,
        newPosts: [action.payload, ...state.all],
      };
    case RECEIVE_DELETE_POST:
      return {
        ...state,
        all: state.all.filter((post) => post._id !== action.payload),
      };
    case RECEIVE_POST:
      return {
        ...state,
        post: action.payload,
      };
    case RECEIVE_NEW_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
};

export default PostsReducer;
