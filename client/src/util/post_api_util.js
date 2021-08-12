import axios from "axios"

export const getPosts = () => {
  return axios.get("/api/post")
}

export const getUserPosts = (id) => {
  return axios.get(`/api/post/user/${id}`)
}

export const writePost = data => {
  return axios.post("/api/post/create", data)
}