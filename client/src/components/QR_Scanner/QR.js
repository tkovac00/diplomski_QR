import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import './styles.css';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

/* eslint-disable */
const QR_Scanner = () => {
    useEffect(() => { 
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    })
    const [scanResult, setScanResult] = useState();
    const [postData, setPostData] = useState({
        payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', 
        bill_postNu_city: '', amount: '',  IBAN: '', model: '', reference_number: '', month_year: '', date: ''
    });

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector((state) => state.posts.find((p) => 
                (user ?.result ?.googleId === p ?.creator || user ?.result ?._id === p ?.creator) &&
                 p.reference_number === postData.reference_number &&
                  p.month_year === postData.month_year
                ));

    const history = useHistory();
    const handleErrorWebCam = (err) => {
        console.log(err);
    }

    const handleScanWebCam = (result) => {
        if (result) {
            setScanResult(result);
            let x = JSON.parse(result);

            setPostData({
                payer_name: x.payer_name,
                payer_surname: x.payer_surname,
                payer_adress: x.payer_adress,
                payer_postNu_city: x.payer_postNu_city,
                title: x.title,
                bill_adress: x.bill_adress,
                bill_postNu_city: x.bill_postNu_city,
                amount: x.amount,
                IBAN: x.IBAN,
                model: x.model,
                reference_number: x.reference_number,
                month_year: x.month_year,
                date: x.date,
                creator: user ?.result ?._id || user ?.result ?.googleId,
                name: user ?.result ?.name
            })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData));
        history.push('/posts');
    }


    return (
        <div className="qr_body">
            <div className="container1">
                <div>
                    <h1>Scan a QR-code</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#e5a00d" width="40" height="40" viewBox="0 0 24 24"><path d="M11 8h-1v-2h1v1h2v1h-1v1h-1v-1zm2 12v-1h-1v1h1zm-1-15v-1h-2v1h1v1h1v-1zm8-1v6h-1v-1h-4v-5h5zm-1 4v-3h-3v3h3zm-14 2h-1v1h2v-1h-1zm0 3h1v1h1v-3h-1v1h-2v2h1v-1zm5 1v2h1v-2h-1zm4-10h-1v3h1v-3zm0 5v-1h-1v1h1zm3-2h1v-1h-1v1zm-10-1h-1v1h1v-1zm2-2v5h-5v-5h5zm-1 1h-3v3h3v-3zm9 5v1h-1v-1h-2v1h-1v-1h-3v-1h-1v1h-1v1h1v2h1v-1h1v2h1v-2h3v1h-2v1h2v1h1v-3h1v1h1v2h1v-1h1v-1h-1v-1h-1v-1h1v-1h-2zm-11 8h1v-1h-1v1zm-2-3h5v5h-5v-5zm1 4h3v-3h-3v3zm12-3v-1h-1v1h1zm0 1h-1v1h-1v-1h-1v-1h1v-1h-2v-1h-1v2h-1v1h-1v3h1v-1h1v-1h2v2h1v-1h1v1h2v-1h1v-1h-2v-1zm-9-3h1v-1h-1v1zm10 2v1h1v1h1v-3h-1v1h-1zm2 4v-1h-1v1h1zm0-8v-1h-1v1h1zm-2-10h4v4h2v-6h-6v2zm-16 4v-4h4v-2h-6v6h2zm4 16h-4v-4h-2v6h6v-2zm16-4v4h-4v2h6v-6h-2z" /></svg>
                </div>

                <div className="frame">

                    <QrReader className="scanner"
                        delay={300}
                        onError={handleErrorWebCam}
                        onScan={handleScanWebCam}
                    />
                    {/* (post && (user ?.result ?.googleId === post ?.creator || user ?.result ?._id === post ?.creator)) */}
                    {(post && (user ?.result ?.googleId === post ?.creator || user ?.result ?._id === post ?.creator)) ? 
                        <div className="message"><h3>Bill is payed</h3></div> :
                         scanResult ? <div className="message"><h3>Bill is scanned</h3></div> :
                          null}<br />

                    <button type="button" className="cancel" onClick={() => { history.push("/"); }}>Cancel</button>
                    {(scanResult && !post) && <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>}
                </div>
            </div>
        </div>
    )
}

export default QR_Scanner;