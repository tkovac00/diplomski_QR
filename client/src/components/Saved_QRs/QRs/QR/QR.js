import React from 'react';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../../../Posts/Post/styles.css'
import { useDispatch } from 'react-redux';
import { deleteQR } from '../../../../actions/QRs';

const QR = ({ QR, setCurrentId }) => {

    const dispatch = useDispatch();

    return (
        <div className="card">

            <div className="edit">
                <h4 className="title">{QR.store}</h4>
                <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(QR._id); }}><MoreHorizIcon fontSize="medium" /></Button>
            </div>  

            <img className="post_photo" loading="lazy" src={QR.image} alt="" />

            <div className="details">
                <h5>Articl: {QR.articl}</h5>
                <h5>Amount: {QR.amount} kn</h5>
            </div>

            <div className="bottom">
                <p>{QR.date}</p>
                <CardActions>
                    <Button size="small" fontSize='10px' color="primary" onClick={() => { dispatch(deleteQR(QR._id)); }}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </div>
        </div>
    );
}

export default QR;