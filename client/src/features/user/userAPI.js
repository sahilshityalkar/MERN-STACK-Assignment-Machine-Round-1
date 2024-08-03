import axios from 'axios';

const API_URL = '/api/user';

export const fetchUser = () => axios.get(API_URL);
export const updateUser = (user) => axios.put(API_URL, user);
