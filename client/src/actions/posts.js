import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes'; 
import * as api from '../api';
//Action creators -- funkcije koje vracaju akciju, akcija je objekt koja ima type:naziv i payload:data

export const getPosts = () => async(dispatch) => {
    try{
        const {data} = await api.fetchPosts(); // const response = await... --> u res uvijek ima data objekt pa se odma destruktuira {data}
        dispatch({type: FETCH_ALL, payload: data});//funkcija dispatcha akciju umjesto da je vrati, action je objekt koji ima type i payload pa ide dispatch({})
    } catch(err){
        console.log(err);
    }
}

export const createPost = (post) => async(dispatch) => {
    try{
         const {data} = await api.createPost(post);
         dispatch({type: CREATE , payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try{
        const {data} = await api.updatePost(id, post); // vraca upddated post
        dispatch({type: UPDATE , payload: data});
    } catch(err) {
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try{
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id})
    } catch (err){
        console.log(err);
    }
}