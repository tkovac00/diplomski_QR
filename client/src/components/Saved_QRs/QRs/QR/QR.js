import React from 'react';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../../../Posts/Post/styles.css'
import { useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { deleteQR } from '../../../../actions/QRs';

const QR = ({ QR, setCurrentId, setIsOpen, setIsHide }) => {

    const dispatch = useDispatch();

    if(QR !== null){
        setIsHide(true);
    }

   


    return (
        <div className="listQRs">
        <div className="card1">

            <div className="edit">
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(QR._id); setIsOpen(true); }}><MoreHorizIcon fontSize="medium" /></Button>
            </div>

            <img className="post_photo" loading="lazy" src={QR.image} alt={QR.image.slice(5, 15)} />
            <div className="title_details">
                <h4 className="title1">{QR.store}</h4>
            </div>
            <div className="details" style={{ marginTop: "0px" }}>
                <h5>Article: {QR.articl}</h5>
                <h5 style={{ display: "inline-block", paddingLeft: "10px", paddingTop: "10px" }}>Amount: <CurrencyFormat value={QR.amount} displayType={'text'} thousandSeparator={true} /> kn</h5>
            </div>

            <div className="bottom">
                <p>{QR.date}</p>
                <CardActions>
                    <Button size="small" fontSize='10px' color="primary" onClick={() => { dispatch(deleteQR(QR._id)); }}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </div>
        </div>
        </div>
    );
}

export default QR;