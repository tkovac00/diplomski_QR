import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';
import './styles.css';
import { useSelector } from 'react-redux';
import { useHistory} from "react-router-dom";
import { CircularProgress } from '@material-ui/core';


const QR_Scanner = ({ setIsQrEditing }) => {

    const [scanResult, setScanResult] = useState();
    const [postData, setPostData] = useState({
        payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: ''
    });

    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.find((p) => p.reference_number === postData.reference_number && p.month_year === postData.month_year));
    console.log(post);
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
                date: x.date
            })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createPost(postData));
        setIsQrEditing(false);
    }


    return (
        <div className="container1">
            <h1>Scan a QR-code</h1><br />
            <div className="frame">
            <QrReader className="scanner"
                delay={300}
                
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
            />
            
            {post ? <div className="message"><h3>Bill is payed</h3></div> : scanResult ? <div className="message"><h3>Bill is scanned</h3></div> : null}<br />

            <button type="button" className="cancel" onClick={() => {history.push("/");}}>Cancel</button>
            {(scanResult && !post) && <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>}
        </div>
        </div>
    )
}

export default QR_Scanner;