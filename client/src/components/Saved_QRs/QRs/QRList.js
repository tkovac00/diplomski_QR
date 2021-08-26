import React from 'react';
import QR from './QR/QR.js';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import '../../Posts/styles.css'


//sa use selector dobavljamo podatke koje smo dohvatili u reducers/posts.js
const QRList = ({ currentId, setCurrentId }) => {

    const QRcodes = useSelector((state) => state.QRs); //imamo pristup stanju (radi store-a) i vracamo state.posts jer su u reducers/index.js vraca posts
    // fetching data from redux - (gore) 


    return (

        !QRcodes.length ? <CircularProgress /> :

            (<div className="Main_grid">
                {
                    QRcodes.map((qr) =>
                        <div key={qr._id}>
                            <QR QR={qr} currentId={currentId} setCurrentId={setCurrentId} />
                        </div>
                    )}
            </div>)
    );
}

export default QRList;