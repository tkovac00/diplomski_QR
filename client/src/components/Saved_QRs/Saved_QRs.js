import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import FileBase from 'react-file-base64'
import { saveQR, updateQR } from '../../actions/QRs';
import QRList from './QRs/QRList'
import Input from "../Form/Input";
import { useHistory} from "react-router-dom";

const Saved_QRs = ({ currentId, setCurrentId, setIsSavedQrEditing }) => {

    const [QRData, setQRData] = useState({
        store: '', articl: '', amount: '', date: '', image: ''
    });
    const qr_post = useSelector((state) => currentId ? state.QRs.find((q) => q._id === currentId) : null);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(false);
    const [imageState, setImageState] = useState(false);
    const history = useHistory();

    const validateStatus = {
        store: { isValid: false, isTouched: false, isFocused: false, placeholder: "Store", type: "text" },
        articl: { isValid: false, isTouched: false, isFocused: false, placeholder: "Product", type: "text" },
        amount: { isValid: false, isTouched: false, isFocused: false, placeholder: "Amount", type: "text" },
        date: { isValid: false, isTouched: false, isFocused: false, placeholder: "Date", type: "date" }
    }

    const [stateArray, setStateArray] = useState(validateStatus);
    useEffect(() => { //koristili smo za update
        if (qr_post) { setQRData(qr_post) };
    }, [qr_post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const copyCurrentState = { ...stateArray };

        if (copyCurrentState.store.isValid && copyCurrentState.articl.isValid && copyCurrentState.amount.isValid && copyCurrentState.date.isValid && imageState) {
            if (currentId) {
                dispatch(updateQR(currentId, QRData));
            }
            else {
                dispatch(saveQR(QRData));
            }
            clear();
        }
        else
            setErrorMessage(true);
    }

    const clear = () => {
        setCurrentId(false);
        setImageState(false);
        setQRData({ store: '', articl: '', amount: '', date: '', image: '' });
    }

    const checkInput = (e) => {

        if (e.target.name === "amount") {
            if (!e.target.value.match(/^[0-9]*\.?[0-9]*$/) && e.target.value !== "") {
                return false;
            }
            else
                return true;
        }


        else if (e.target.name === "date") {
            if (e.target.value !== "") {
                return true;
            }
            else
                return false;
        }
        else
            return true;
    }

    const onBlurEvent = (name) => {
        const copyCurrentState = { ...stateArray };
        copyCurrentState[name].isFocused = true;

        setStateArray(copyCurrentState)
    }

    const changeHandler = (name, e) => {
        const copyQRData = { ...QRData };
        copyQRData[name] = e.target.value;
        setQRData(copyQRData);
        const copyCurrentState = { ...stateArray };

        copyCurrentState[name].isValid = checkInput(e);

        setStateArray(copyCurrentState)
    }

    const onTouchEvent = (name) => {
        const copyCurrentState = { ...stateArray }
        copyCurrentState[name].isTouched = true

        setStateArray(copyCurrentState)
    }
    // radimo nizarray od  statetArray sa payer_name{isValid,isFocused,isTouched vrijednostima }...
    const array = []
    for (let key in stateArray) {
        array.push({
            id: key,        //key od stateArray(npr. payer_name)
            info: stateArray[key] // info = objekt od statearray[payer_name] -> {isValid,isFocused,isTouched vrijednostima }
        })
    }


    let formElements = array.map(name => { //name.id=payer_name, name.info= {isValid,isFocused,isTouched}
        return (
            <Input
                key1={name.id}
                value={QRData[name.id]}
                isValid={name.info.isValid}
                isFocused={name.info.isFocused}
                isTouched={name.info.isTouched}
                placeholder={name.info.placeholder}
                type={name.info.type}
                setTouched={() => onTouchEvent(name.id)}
                setBlured={() => onBlurEvent(name.id)}
                setChange={(e) => { changeHandler(name.id, e) }}
            />
        )
    })
    //console.log(QRData.image);
    return (
        <div >
            <div className="mainCont">
                <h2 className="titles"  >{currentId ? 'Editing a' : 'Add a new'} QR-code</h2>

                {formElements}
                <label>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => { setImageState(true); setQRData({ ...QRData, image: base64 }) }} />
                    {/* <img className="photo" src={add_photo} alt="" /><h4>Upload</h4> */}
                </label><br />

                <button type="button" className="cancel" style={{marginBottom:"10px"}} onClick={() => {history.push("/"); clear(); }}>Cancel</button>
                <button type="submit" className="submit" style={{marginBottom:"10px"}} onClick={handleSubmit}>Submit</button><br />
                {errorMessage && <span style={{fontWeight:"bold", color: "white"}}>All fields must be filled !</span>}
            </div>
            <QRList currentId={currentId} setCurrentId={setCurrentId} />

        </div>
    )
}

export default Saved_QRs;