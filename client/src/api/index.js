import axios from 'axios';

const url = 'https://finance-app1.herokuapp.com/posts';
//const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);

// export const fetchQRs = () => axios.get('posts/QRs');
// export const saveQR = (newQR) => { axios.post('posts/QRs', newQR) };
// export const deleteQR = (id) => axios.delete(`${url}/QRs/${id}`);
// export const updateQR = (id, updatedQr) => axios.patch(`${url}/QRs/${id}`, updatedQr);

export const fetchQRs = () => axios.get(`${url}/QRs`);
export const saveQR = (newQR) => { axios.post(`${url}/QRs`, newQR) };
export const deleteQR = (id) => axios.delete(`${url}/QRs/${id}`);
export const updateQR = (id, updatedQr) => axios.patch(`${url}/QRs/${id}`, updatedQr);