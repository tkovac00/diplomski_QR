import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form'
import QrReader from 'react-qr-reader';

import './styles.css'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [isEditing, setIsEditing] = useState();
    const [scanResult, setScanResult] = useState();
    const dispatch = useDispatch(); //hook

    useEffect(() => { //pozovemo f-ju,prvi arg, je callback funkcija,a drugi niz  --- kao mount i update
        dispatch(getPosts());
    }, [currentId, dispatch]);

const handleErrorWebCam = (err) =>{
    console.log(err);
}

const handleScanWebCam = (result) => {
    if(result){
        setScanResult(result);
    }
}

    return (
        <div className="body">
            <Header />

            <QrReader 
            delay={300}
            style={{width: '50%'}}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
            />

            <h3>Scanned by webCam Code : {scanResult}</h3>
            
            {!isEditing && <button onClick={ () => {setIsEditing(true)}}>Add New Expense</button>}
            {isEditing && <Form currentId={currentId} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />}
            
            <Posts setCurrentId={setCurrentId} setIsEditing={setIsEditing} />
        </div>
    );
}

export default App;