import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import FileBase from 'react-file-base64'
import { saveQR, updateQR } from '../../actions/QRs';
import QRList from './QRs/QRList'

const Saved_QRs = ({ currentId, setCurrentId, setIsSavedQrEditing }) => {

    const [QRData, setQRData] = useState({
        store: '', articl: '', amount: '', date: '', image: ''
    });
    const qr_post = useSelector((state) => currentId ? state.QRs.find((q) => q._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => { //koristili smo za update
        if (qr_post) { setQRData(qr_post) };
    }, [qr_post]);
   

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updateQR(currentId, QRData));
        }
        else{
        dispatch(saveQR(QRData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(false);
        setQRData({  store: '', articl: '', amount: '', date: '', image: ''});
    }

    return (
        <div >
            <div className="mainCont">
                 <h2 className="titles"  >{currentId ? 'Editing a' : 'Add a new'} QR-code</h2>

                 <form className="form" autoComplete="off" noValidate>
                        <input type="text" placeholder="Store" name="store" value={QRData.store} onChange={(e) => setQRData({ ...QRData, store: e.target.value })} /><br />
                        <input type="text" placeholder="Product" name="articl" value={QRData.articl} onChange={(e) => setQRData({ ...QRData, articl: e.target.value })} /><br />
                        <input type="text" placeholder="Amount" name="amount" value={QRData.amount} onChange={(e) => setQRData({ ...QRData, amount: e.target.value })} /><br />
                        <input type="date" placeholder="Date" name="date" value={QRData.date} onChange={(e) => setQRData({ ...QRData, date: e.target.value })} /><br />
                        <label>
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setQRData({ ...QRData, image: base64 })} />
                            {/* <img className="photo" src={add_photo} alt="" /><h4>Upload</h4> */}
                        </label>

                        <button type="button" className="cancel" onClick={() => { setIsSavedQrEditing(false); clear(); }}>Cancel</button>
                        <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                 </form>
          </div>
            <QRList  currentId={currentId} setCurrentId={setCurrentId}/>
          
        </div>
    )
}

export default Saved_QRs;