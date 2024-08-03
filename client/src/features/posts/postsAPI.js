import axios from 'axios';

const API_URL = '/api/posts';

export const fetchPosts = () => axios.get(API_URL);
export const createPost = (post) => axios.post(API_URL, post);
export const updatePost = (post) => axios.put(`${API_URL}/${post.id}`, post);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
