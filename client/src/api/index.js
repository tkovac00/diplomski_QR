import axios from 'axios';


// const url = 'https://finance-app1.herokuapp.com/posts';
// const url = 'http://localhost:5000/posts';

 const API = axios.create({ baseURL: 'http://localhost:5000' });

// const API = axios.create({ baseURL: 'https://finance-app1.herokuapp.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchQRs = () => API.get(`/posts/QRs`);
export const saveQR = (newQR) => API.post(`/posts/QRs`, newQR);
export const deleteQR = (id) => API.delete(`/posts/QRs/${id}`);
export const updateQR = (id, updatedQr) => API.patch(`/posts/QRs/${id}`, updatedQr);

export const signIn = (form) => API.post('/users/signIn', form);
export const signUp = (form) => API.post('/users/signUp', form);
