import React, { useState } from 'react';
import Header from './components/Header/Header'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Home from './components/Home'
import QR from './components/QR_Scanner/QR';
import Auth from './components/Auth/auth'
import Saved_QRs from './components/Saved_QRs/Saved_QRs';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css'

/* eslint-disable */
const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const [isEditing, setIsEditing] = useState();
    const [IsPostEditing, setIsPostEditing] = useState();
    const [isQrEditing, setIsQrEditing] = useState();
    const [isSavedQrEditing, setIsSavedQrEditing] = useState();
    const [isSignup, setIsSignup] = useState(false);

    return (

        <div>

            <Router basename="/">
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <Home setIsSignup={setIsSignup} currentId={currentId} setCurrentId={setCurrentId} isEditing={isEditing} setIsEditing={setIsEditing} IsPostEditing={IsPostEditing} setIsPostEditing={setIsPostEditing} isQrEditing={isQrEditing} setIsQrEditing={setIsQrEditing} isSavedQrEditing={isSavedQrEditing} setIsSavedQrEditing={setIsSavedQrEditing} />
                    </Route>
                    <Route exact path="/auth">
                        <Header />
                        <Auth isSignup={isSignup} setIsSignup={setIsSignup} />
                    </Route>
                    <Route exact path="/add-bill">
                        <Header />
                        <QR />
                    </Route>
                    <Route exact path="/form">
                        <Header />
                        {<Form currentId={currentId} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />}
                    </Route>
                    <Route exact path="/posts">
                        <Header />
                        {<Posts currentId={currentId} setCurrentId={setCurrentId} setIsPostEditing={setIsPostEditing} setIsEditing={setIsEditing} />}
                    </Route>
                    <Route exact path="/qrs">
                        <Header />
                        <Saved_QRs currentId={currentId} setCurrentId={setCurrentId} />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;