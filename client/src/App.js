import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { getQRs } from './actions/QRs';
import { Link } from 'react-router-dom'
//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Home from './components/Home'
import QR from './components/QR_Scanner/QR';
import Saved_QRs from './components/Saved_QRs/Saved_QRs';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import './styles.css'

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [isEditing, setIsEditing] = useState();
    const [IsPostEditing, setIsPostEditing] = useState();
    const [isQrEditing, setIsQrEditing] = useState();
    const [isSavedQrEditing, setIsSavedQrEditing] = useState();


    return (
        <div className="body">
           
            <Header />
            <Router basename="/">
                <Switch>
                    <Route exact path="/">
                    <Home currentId = {currentId} setCurrentId = {setCurrentId} isEditing={isEditing} setIsEditing={setIsEditing} IsPostEditing={IsPostEditing} setIsPostEditing={setIsPostEditing} isQrEditing={isQrEditing} setIsQrEditing={setIsQrEditing} isSavedQrEditing={isSavedQrEditing} setIsSavedQrEditing={setIsSavedQrEditing}/>
                        </Route>
                    <Route exact path="/add-bill">
                            <QR /> 
                        </Route>
                    <Route exact path="/form">
                    {isEditing && <Form currentId={currentId} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />}
                        </Route>
                    <Route exact path="/posts">
                       {IsPostEditing && <Posts currentId={currentId} setCurrentId={setCurrentId} setIsPostEditing={setIsPostEditing} setIsEditing={setIsEditing} />}
                        </Route>
                    <Route exact path="/qrs">
                           <Saved_QRs currentId={currentId} setCurrentId={setCurrentId} />
                        </Route>
                </Switch>
           </Router>
        </div>
    );
}

export default App;