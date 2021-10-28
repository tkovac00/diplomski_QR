import React, { useEffect } from 'react';
import QR from './QR/QR.js';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import '../../Posts/styles.css'
import { useDispatch } from 'react-redux';
import { getQRs } from '../../../actions/QRs';

/* eslint-disable */
//sa use selector dobavljamo podatke koje smo dohvatili u reducers/posts.js
const QRList = ({ currentId, setCurrentId, setIsOpen, input, setIsHide }) => {

    const QRcodes = useSelector((state) => state.QRs); //imamo pristup stanju (radi store-a) i vracamo state.posts jer su u reducers/index.js vraca posts
    // fetching data from redux - (gore) 

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(getQRs());
    }, [dispatch, QRcodes.length]);


    return (

        !QRcodes.length ? <CircularProgress /> :

            (<div className="Main_grid">
                {
                    QRcodes.map((qr) =>
                        <div key={qr._id}>
                            {(user ?.result ?.googleId === qr ?.creator || user ?.result ?._id === qr ?.creator) &&
                             (qr.store.toLowerCase().match(input.toLowerCase()) || qr.articl.toLowerCase().match(input.toLowerCase())) && <QR QR={qr} currentId={currentId} setCurrentId={setCurrentId} setIsOpen={setIsOpen} setIsHide={setIsHide} />}
                        </div>
                    )}
            </div>)
    );
}

export default QRList;