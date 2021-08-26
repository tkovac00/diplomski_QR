import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { getQRs } from './actions/QRs';
//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form'
import QR from './components/QR_Scanner/QR';
import Saved_QRs from './components/Saved_QRs/Saved_QRs';

import './styles.css'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [isEditing, setIsEditing] = useState();
    const [IsPostEditing, setIsPostEditing] = useState();
    const [isQrEditing, setIsQrEditing] = useState();
    const [isSavedQrEditing, setIsSavedQrEditing] = useState();

    const dispatch = useDispatch(); //hook

    useEffect(() => { //pozovemo f-ju,prvi arg, je callback funkcija,a drugi niz  --- kao mount i update
        dispatch(getPosts());
        dispatch(getQRs());
    }, [currentId, dispatch]);

    return (
        <div className="body">
            <Header />


            {!isQrEditing && <button className="main-button" onClick={() => { setIsQrEditing(true) }}>Scan QR</button>}
            {isQrEditing && <QR setIsQrEditing={setIsQrEditing} />}


            {!isEditing && <button className="main-button" onClick={() => { setIsEditing(true) }}>Add New Expense</button>}
            {isEditing && <Form currentId={currentId} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />}

            {!IsPostEditing && <button className="main-button" onClick={() => { setIsPostEditing(true) }}>List of bills</button>}
            {IsPostEditing && <Posts currentId={currentId} setCurrentId={setCurrentId} setIsPostEditing={setIsPostEditing} setIsEditing={setIsEditing} />}

          {!isSavedQrEditing && <button className="main-button" onClick={() => { setIsSavedQrEditing(true) }} >Saved QRs</button>} 
           {isSavedQrEditing && <Saved_QRs currentId={currentId} setCurrentId={setCurrentId} setIsSavedQrEditing={setIsSavedQrEditing} />}

        </div>
    );
}

export default App;