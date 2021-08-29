import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/posts';
import { getQRs } from '../actions/QRs';
//import { Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Header from './Header/Header'
import Posts from './Posts/Posts';
import Form from './Form/Form'
import QR from './QR_Scanner/QR';
import Saved_QRs from './Saved_QRs/Saved_QRs';
import {BrowserRouter as Router, Switch, Route, useHistory} from "react-router-dom";
import '../styles.css'

const Home = ({currentId, setCurrentId, isEditing, setIsEditing, IsPostEditing, setIsPostEditing, isQrEditing, setIsQrEditing, isSavedQrEditing, setIsSavedQrEditing}) => {

    const dispatch = useDispatch(); //hook
    const history = useHistory();
    useEffect(() => { //pozovemo f-ju,prvi arg, je callback funkcija,a drugi niz  --- kao mount i update
        dispatch(getPosts());
        dispatch(getQRs());
    }, [currentId, dispatch]);

    return (
        <div className="body">
             <div className="body2">
            <Header />
            <div className="title">Welcome to your QR-based accounting</div>
            </div>
            <div className="container">
                <div className="card">
               
                    <div> <span><svg xmlns="http://www.w3.org/2000/svg" fill="#e5a00d" width="40" height="40" viewBox="0 0 24 24"><path d="M11 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1zm-2-10h4v4h2v-6h-6v2zm-16 4v-4h4v-2h-6v6h2zm4 16h-4v-4h-2v6h6v-2zm16-4v4h-4v2h6v-6h-2z"/></svg></span>QR code</div>
                    <span>To get started, only thing you need is scan QR code form your bill</span>
                    <button className="main-button" onClick={() => { history.push("/add-bill");}}>Scan QR</button>
                </div>
                    <div className="card">
                    <div><span><svg xmlns="http://www.w3.org/2000/svg" fill="#e5a00d" width="40" height="40" viewBox="0 0 24 24"><path d="M18 13.45l2-2.023v4.573h-2v-2.55zm-11-5.45h1.743l1.978-2h-3.721v2zm1.361 3.216l11.103-11.216 4.536 4.534-11.102 11.218-5.898 1.248 1.361-5.784zm1.306 3.176l2.23-.472 9.281-9.378-1.707-1.707-9.293 9.388-.511 2.169zm3.333 7.608v-2h-6v2h6zm-8-2h-3v-2h-2v4h5v-2zm13-2v2h-3v2h5v-4h-2zm-18-2h2v-4h-2v4zm2-6v-2h3v-2h-5v4h2z"/></svg></span>Fill in the form</div>
                    <span>To get started, only thing you need is scan QR code form your bill</span>
                    {!isEditing && <button className="main-button" onClick={() => {history.push("/form"); setIsEditing(true)}}>Add New Expense</button>}
                </div>
                <div className="card">
                    <div><span><svg xmlns="http://www.w3.org/2000/svg" fill="#e5a00d" width="40" height="40" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z"/></svg></span>Finance history</div>
                    <span>To get started, only thing you need is scan QR code form your bill</span>
                    {!IsPostEditing && <button className="main-button" onClick={() => { history.push("/posts");setIsPostEditing(true) }}>List of bills</button>}
                </div>
                <div className="card">
                    <div><span><svg xmlns="http://www.w3.org/2000/svg" fill="#e5a00d" width="40" height="40" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg></span>All the bills</div>
                    <span>To get started, only thing you need is scan QR code form your bill</span>
                    <button className="main-button" onClick={() => { history.push("/qrs"); }} >Saved QRs</button>
                </div>
            </div>
        </div>
    );
}

export default Home;