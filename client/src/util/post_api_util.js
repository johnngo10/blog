import axios from "axios";

export const getPosts = () => {
  return axios.get("/api/post");
};

export const getUserPosts = (id) => {
  return axios.get(`/api/post/user/${id}`);
};

export const writePost = (data) => {
  return axios.post("/api/post/create", data);
};

export const getPost = (postId) => {
  return axios.get(`/api/post/${postId}`);
};

export const removePost = (id) => {
  return axios.delete(`/api/post/${id}`);
};

export const writeComment = (postId, data) => {
  return axios.post(`/api/post/${postId}/comment/create`, data);
};

export const removeComment = (postId, commentId) => {
  return axios.delete(`/api/post/${postId}/comment/${commentId}`);
};
