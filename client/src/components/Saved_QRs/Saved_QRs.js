import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css'
import FileBase from 'react-file-base64'
import { saveQR, updateQR } from '../../actions/QRs';
import QRList from './QRs/QRList'
import Input from "../Form/Input";
import { useHistory } from "react-router-dom";

/* eslint-disable */
const Saved_QRs = ({ currentId, setCurrentId, setIsSavedQrEditing }) => {

    const [QRData, setQRData] = useState({
        store: '', articl: '', amount: '', date: '', image: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const qr_post = useSelector((state) => currentId ? state.QRs.find((q) => q._id === currentId) : null);

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(false);
    const [imageState, setImageState] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [IsHide, setIsHide] = useState(false);
    const history = useHistory();

    const validateStatus = {
        store: { isValid: false, isTouched: false, isFocused: false, placeholder: "Store", type: "text" },
        articl: { isValid: false, isTouched: false, isFocused: false, placeholder: "Product", type: "text" },
        amount: { isValid: false, isTouched: false, isFocused: false, placeholder: "Amount", type: "text" },
        date: { isValid: false, isTouched: false, isFocused: false, placeholder: "Date", type: "date" }
    }

    const [stateArray, setStateArray] = useState(validateStatus);

    useEffect(() => { 
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if (qr_post) {
            setQRData(qr_post);
            if (currentId) {
                const validateStatusCopy = { ...stateArray }
                for (let key in validateStatusCopy) {
                    validateStatusCopy[key].isValid = true;
                    validateStatusCopy[key].isTouched = true;
                    validateStatusCopy[key].isFocused = true;
                }
            }
        };
    }, [qr_post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const copyCurrentState = { ...stateArray };

        if (copyCurrentState.store.isValid && copyCurrentState.articl.isValid && copyCurrentState.amount.isValid && copyCurrentState.date.isValid && imageState) {
            if (currentId) {
                dispatch(updateQR(currentId, { ...QRData, name: user ?.result ?.name}));
            }
            else {
                dispatch(saveQR({ ...QRData, name: user ?.result ?.name}));
            }
            clear();
        }
        else
            setErrorMessage(true);
    }

    const clear = () => {
        setIsOpen(false);
        setCurrentId(false);
        setImageState(false);
        setQRData({ store: '', articl: '', amount: '', date: '', image: '' });
        setErrorMessage(false);
    }

    const checkField = (e, regex) => {
        if (!e.target.value.match(regex) || e.target.value === "") {
            return false;
        }
        else
            return true;
    }


    const checkInput = (e) => {

        switch (e.target.name) {
            case "amount":
                return checkField(e, /^[0-9]*\.?[0-9]*$/)
            default:
                if (e.target.value !== "") {
                    return true;
                }
                else
                    return false;
        }
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
            <Input key={name.id}
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

    const searchChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    // if (input.length > 0) {
    //     QRs = QRs.filter((qr) => {
    //       return qr.store.toLowerCase().match(input.toLowerCase());
    //     });
    //     console.log(QRs);
    // }

    //console.log(QRData.image);
    return (
        <div className="body">
            <input type="text" className="search" value={input} onChange={searchChange} placeholder="Search"></input>
            <div className="Main_grid2">
                <div className="mainCont">
                    <h1>Your QR-based gallery</h1>
                    {isOpen ? (
                        <div className="qr_adder">
                            <h2 className="titles"  >{currentId ? 'Editing a' : 'Add a new'} QR-code</h2>
                            {formElements}
                            <label>
                                <FileBase type="file" multiple={false} style={{ color: "black" }} onDone={({ base64 }) => { setImageState(true); setQRData({ ...QRData, image: base64 }) }} />
                                {/* <img className="photo" src={add_photo} alt="" /><h4>Upload</h4> */}
                            </label><br />
                            <button type="button" className="cancel" style={{ marginBottom: "10px" }} onClick={() => { setIsOpen(false); clear(); setErrorMessage(false); }}>Cancel</button>
                            <button type="submit" className="submit" style={{ marginBottom: "10px" }} onClick={(e) => { handleSubmit(e); }}>Submit</button><br />

                            {errorMessage && <span style={{ fontWeight: "bold", color: "white" }}>All fields must be filled !</span>}
                        </div>) : (<button type="button" className="add_qr_button" onClick={() => { setIsOpen(true) }}>Add a new QR</button>)

                    }

                </div>
                <QRList currentId={currentId} setCurrentId={setCurrentId} setIsOpen={setIsOpen} input={input} setIsHide={setIsHide} />
                {IsHide ? (<div className="hide"><button type="button" className="hide_button" onClick={() => { history.push("/"); }}>Hide the list</button></div>) : <h2 style={{ textAlign: "center", marginTop: "150px", color: "#e5a00d" }}>Gallery is empty!</h2>}
            </div>
        </div>
    )
}

export default Saved_QRs;