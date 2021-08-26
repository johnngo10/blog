import {
  getPosts,
  getUserPosts,
  writePost,
  getPost,
  removePost,
  writeComment,
} from "../util/post_api_util";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_USER_POSTS = "RECEIVE_USER_POSTS";
export const RECEIVE_NEW_POST = "RECEIVE_NEW_POST";
export const RECEIVE_DELETE_POST = "RECEIVE_DELETE_POST";
export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_NEW_POST_ERRORS = "RECEIVE_NEW_POST_ERRORS";
export const RECEIVE_NEW_COMMENT = "RECEIVE_NEW_COMMENT";

export const receivePosts = (data) => ({
  type: RECEIVE_POSTS,
  payload: data,
});

export const receiveUserPosts = (data) => ({
  type: RECEIVE_USER_POSTS,
  payload: data,
});

export const receiveNewPost = (data) => ({
  type: RECEIVE_NEW_POST,
  payload: data,
});

export const receiveDeletePost = (id) => ({
  type: RECEIVE_DELETE_POST,
  payload: id,
});

export const receivePost = (data) => ({
  type: RECEIVE_POST,
  payload: data,
});

export const receiveNewPostErrors = (error) => ({
  type: RECEIVE_NEW_POST_ERRORS,
  payload: error,
});

export const receiveNewComment = (comment) => ({
  type: RECEIVE_NEW_COMMENT,
  payload: comment,
});

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await getPosts();

    dispatch(receivePosts(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await getUserPosts(id);

    dispatch(receiveUserPosts(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const composePost = (post) => async (dispatch) => {
  try {
    const { data } = await writePost(post);

    dispatch(receiveNewPost(data));
  } catch (error) {
    console.log(error.message);
    dispatch(receiveNewPostErrors(error.response.data));
  }
};

export const fetchPost = (postId) => async (dispatch) => {
  try {
    const { data } = await getPost(postId);

    dispatch(receivePost(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await removePost(id);

    dispatch(receiveDeletePost(id));
  } catch (error) {
    console.log(error.message);
  }
};

export const composeComment = (postId, comment) => async (dispatch) => {
  try {
    const { data } = await writeComment(postId, comment);

    dispatch(receiveNewComment(data));
  } catch (error) {
    console.log(error.message);
  }
};
