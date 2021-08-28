import React, { useState, useEffect } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Input from "./Input"


// for update here we need to GET the current ID of post which we need to change
const Form = ({ currentId, setCurrentId, setIsEditing }) => {
    const history = useHistory();
    const [postData, setPostData] = useState({
        payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: ''
    });
    const validateStatus = {
        payer_name: { isValid: false, isTouched: false, isFocused: false },
        payer_surname: { isValid: false, isTouched: false, isFocused: false },
        payer_adress: { isValid: false, isTouched: false, isFocused: false },
        payer_postNu_city: { isValid: false, isTouched: false, isFocused: false },
        title: { isValid: false, isTouched: false, isFocused: false },
        bill_adress: { isValid: false, isTouched: false, isFocused: false },
        bill_postNu_city: { isValid: false, isTouched: false, isFocused: false },
        amount: { isValid: false, isTouched: false, isFocused: false },
        IBAN: { isValid: false, isTouched: false, isFocused: false },
        model: { isValid: false, isTouched: false, isFocused: false },
        reference_number: { isValid: false, isTouched: false, isFocused: false },
        month_year: { isValid: false, isTouched: false, isFocused: false },
        date: { isValid: false, isTouched: false, isFocused: false }
    }
    const [stateArray, setStateArray] = useState(validateStatus);
    const [validate, isValidate] = useState(false);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //dohvacanje data form redux, dohvacanje (podataka) posta koji ima isti ID kao trenutni,ako nema current ID onda null
    const dispatch = useDispatch();

    useEffect(() => { //koristili smo za update
        if (post) { setPostData(post) };
    }, [post]); // za popunit podatke u formi(useefeeect korisit se za prikazat nesto ako se nesto promijeni) ako se forma promijeni od nicega u pravi post

    const [errorMessage, setErrorMessage] = useState({
        payer_name_error: '', payer_surname_error: '', payer_adress_error: '', payer_postNu_city_error: '', title_error: '', bill_adress_error: '', bill_postNu_city_error: '', amount_error: '', IBAN_error: '', model_error: '', reference_number_error: '', month_year_error: '', date_error: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
            setIsEditing(false);

        } else {
            dispatch(createPost(postData)); //ako je currentId null dispatchamo createPost()
            setIsEditing(false);

        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: '' });
    }

    const checkInput = (e) => {
        if (e.target.name === "payer_name") {
            if (!e.target.value.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
                return false
            }
            else
                return true
        }

        else if (e.target.name === "payer_surname") {
            if (!e.target.value.match(/^[a-zA-Z][a-zA-Z\s]*$/) && e.target.value !== "") {
                setErrorMessage({ ...errorMessage, payer_surname_error: 'Letters only' });
                isValidate(false);
            }
            else
                setErrorMessage({ ...errorMessage, payer_surname_error: '' }); isValidate(true);
        }

        else if (e.target.name === "amount") {
            if (!e.target.value.match(/^[0-9]*\.?[0-9]*$/) && e.target.value !== "") {
                setErrorMessage({ ...errorMessage, amount_error: 'Numbers only' });
                isValidate(false);
            }
            else
                setErrorMessage({ ...errorMessage, amount_error: '' }); isValidate(true);
        }

        else if (e.target.name === "IBAN") {
            if (!e.target.value.match(/^[A-Z]{2}[0-9]{19,23}$/) && e.target.value !== "") {
                setErrorMessage({ ...errorMessage, IBAN_error: 'Correct format (e.g.) : HR1234567891234567891' });
                isValidate(false);
            }
            else
                setErrorMessage({ ...errorMessage, IBAN_error: '' }); isValidate(true);
        }

        else if (e.target.name === "model") {
            if (!e.target.value.match(/^[A-Z]{2}[0-9]{2}$/) && e.target.value !== "") {
                setErrorMessage({ ...errorMessage, model_error: 'Correct format (e.g.) : HR00' });
                isValidate(false);
            }
            else
                setErrorMessage({ ...errorMessage, model_error: '' }); isValidate(true);
        }
        else if (e.target.name === "reference_number") {
            if (!e.target.value.match(/^[0-9-]+$/) && e.target.value !== "") {
                setErrorMessage({ ...errorMessage, reference_number_error: 'Correct format (e.g.) : 2706-153-2021' });
                isValidate(false);
            }
            else
                setErrorMessage({ ...errorMessage, reference_number_error: '' }); isValidate(true);
        }

        else if (e.target.name === "month_year") {
            if (e.target.value === "") {
                setErrorMessage({ ...errorMessage, month_year_error: 'Please, select a month/year' });
                isValidate(false);
            }
        }

        else if (e.target.name === "date") {
            if (e.target.value === "") {
                setErrorMessage({ ...errorMessage, date_error: 'Please, select a date of paying' });
                isValidate(false);
            }
        }
        else
            console.log("...");
    }

    const onBlurEvent = (name) => {
        const copyCurrentState = { ...stateArray };
        copyCurrentState[name].isFocused = true;

        setStateArray(copyCurrentState)
    }

    const changeHandler = (name, e) => {
        const copyPostData = { ...postData };
        copyPostData[name] = e.target.value;
        setPostData(copyPostData);
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
                value={postData[name.id]}
                isValid={name.info.isValid}
                isFocused={name.info.isFocused}
                isTouched={name.info.isTouched}
                setTouched={() => onTouchEvent(name.id)}
                setBlured={() => onBlurEvent(name.id)}
                setChange={(e) => { console.log(e); changeHandler(name.id, e) }}
            />
        )
    })
    return (
        <div className="container">
            <h2 className="titles"  >{currentId ? 'Editing the' : 'Add a new'} bill</h2>
            {formElements}
            {/* <form className="form" autoComplete="off" noValidate>
                <input type="text" placeholder="Name" name="payer_name" value={postData.payer_name} onFocus={() => onTouchEvent("payer_name")} onBlur={() => onBlurEvent("payer_name")} onChange={(e) => { changeHandler(e); setPostData({ ...postData, payer_name: e.target.value }) }} required /><br />
                {stateArray["payer_name"].isFocused && stateArray["payer_name"].isTouched && !stateArray["payer_name"].isValid && <span >ALOOO</span>}
                <input type="text" placeholder="Surname" name="payer_surname" value={postData.payer_surname} onFocus={() => onTouchEvent("surname")} onBlur={() => onBlurEvent("surname")} onChange={(e) => { changeHandler(e); setPostData({ ...postData, payer_surname: e.target.value }) }} /><br />
                <span>{errorMessage.payer_surname_error}</span>
                <input type="text" placeholder="Adress" name="payer_adress" value={postData.payer_adress} onChange={(e) => { changeHandler(e); setPostData({ ...postData, payer_adress: e.target.value }) }} /><br />
                <input type="text" placeholder="Postal code and city" name="payer_postNu_city" value={postData.payer_postNu_city} onChange={(e) => { changeHandler(e); setPostData({ ...postData, payer_postNu_city: e.target.value }) }} /><br />
                <input type="text" placeholder="Bill for..." name="title" value={postData.title} onChange={(e) => { changeHandler(e); setPostData({ ...postData, title: e.target.value }) }} /><br />
                <input type="text" placeholder="Payment adress" name="bill_adress" value={postData.bill_adress} onChange={(e) => { changeHandler(e); setPostData({ ...postData, bill_adress: e.target.value }) }} /><br />
                <input type="text" placeholder="Payment postal code and city" name="bill_postNu_city" value={postData.bill_postNu_city} onChange={(e) => { changeHandler(e); setPostData({ ...postData, bill_postNu_city: e.target.value }) }} /><br />
                <input type="text" placeholder="Amount (eur)" name="amount" value={postData.amount} onChange={(e) => { changeHandler(e); setPostData({ ...postData, amount: e.target.value }) }} /><br />
                <span>{errorMessage.amount_error}</span>
                <input type="text" placeholder="IBAN" name="IBAN" value={postData.IBAN} onChange={(e) => { changeHandler(e); setPostData({ ...postData, IBAN: e.target.value }) }} /><br />
                <span>{errorMessage.IBAN_error}</span>
                <input type="text" placeholder="MODEL" name="model" value={postData.model} onChange={(e) => { changeHandler(e); setPostData({ ...postData, model: e.target.value }) }} /><br />
                <span>{errorMessage.model_error}</span>
                <input type="text" placeholder="Reference number" name="reference_number" value={postData.reference_number} onChange={(e) => { changeHandler(e); setPostData({ ...postData, reference_number: e.target.value }) }} /><br />
                <span>{errorMessage.reference_number_error}</span>
                <input type="month" placeholder="Payment month/year" name="month_year" value={postData.month_year} onChange={(e) => { changeHandler(e); setPostData({ ...postData, month_year: e.target.value }) }} /><br />
                <span>{errorMessage.month_year_error}</span>
                <input type="date" placeholder="Payment date" name="date" value={postData.date} onChange={(e) => { changeHandler(e); setPostData({ ...postData, date: e.target.value }) }} /><br />
                <span>{errorMessage.date}</span>

                <button type="button" className="cancel" onClick={() => { setIsEditing(false); clear(); }}>Cancel</button>
                <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>

            </form> */}

        </div>
    );
}

export default Form;