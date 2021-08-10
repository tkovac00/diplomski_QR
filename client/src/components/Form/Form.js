import React, { useState, useEffect } from 'react';
import './styles.css';
import add_photo from '../../photos/add_photo.png'
//import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';



// for update here we need to GET the current ID of post which we need to change
const Form = ({ currentId, setCurrentId, setIsEditing }) => {

    const [postData, setPostData] = useState({
        payer: '', title: '', month: '', amount: '', description: '', date: '', selectedFile: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //dohvacanje data form redux, dohvacanje (podataka) posta koji ima isti ID kao trenutni,ako nema current ID onda null
    const dispatch = useDispatch();

    useEffect(() => { //koristili smo za update
        if (post) { setPostData(post) };
    }, [post]); // za popunit podatke u formi(useefeeect korisit se za prikazat nesto ako se nesto promijeni) ako se forma promijeni od nicega u pravi post

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
            setIsEditing(false);

        } else {
            dispatch(createPost(postData)); //ako je currentId null dispatchamo createPost()
            setIsEditing(false);
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ payer: '', title: '', month: '', amount: '', description: '', date: '', selectedFile: '' });
    }
    return (
        <div className="container">
            <h2 className="title"  >{currentId ? 'Editing the' : 'Add a new'} bill</h2>

            <form className="form" autoComplete="off" noValidate onSubmit={handleSubmit}>
                <input type="text" placeholder="Payer" name="payer" value={postData.payer} onChange={(e) => setPostData({ ...postData, payer: e.target.value })} /><br />
                <input type="text" placeholder="Bill for..." name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} /><br />
                <input type="text" placeholder="amount" name="amount" value={postData.amount} onChange={(e) => setPostData({ ...postData, amount: e.target.value })} /><br />
                <input type="text" placeholder="Description" name="description" value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} /><br />
                <input type="text" placeholder="Month" name="month" value={postData.month} onChange={(e) => setPostData({ ...postData, month: e.target.value })} /><br />
                <input type="date" placeholder="Date" name="date" value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} /><br />

                <label className="file-upload__icon">
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    <img className="photo" src={add_photo} alt="" /><h4>Upload</h4>
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Form;