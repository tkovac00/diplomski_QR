import React, { useState, useEffect } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Input from "./Input"

/* eslint-disable */
// for update here we need to GET the current ID of post which we need to change
const Form = ({ currentId, setCurrentId, }) => {
    const history = useHistory();
    const [postData, setPostData] = useState({
        payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //dohvacanje data form redux, dohvacanje (podataka) posta koji ima isti ID kao trenutni,ako nema current ID onda null
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));

    const validateStatus = {
        payer_name: { isValid: false, isTouched: false, isFocused: false, placeholder: "Name", type: "text" },
        payer_surname: { isValid: false, isTouched: false, isFocused: false, placeholder: "Surame", type: "text" },
        payer_adress: { isValid: false, isTouched: false, isFocused: false, placeholder: "Adress", type: "text" },
        payer_postNu_city: { isValid: false, isTouched: false, isFocused: false, placeholder: "Postal code and city", type: "text" },
        title: { isValid: false, isTouched: false, isFocused: false, placeholder: "Bill for ...", type: "text" },
        bill_adress: { isValid: false, isTouched: false, isFocused: false, placeholder: "Payment adress", type: "text" },
        bill_postNu_city: { isValid: false, isTouched: false, isFocused: false, placeholder: "Payment postal code and city", type: "text" },
        amount: { isValid: false, isTouched: false, isFocused: false, placeholder: "Amount", type: "text" },
        IBAN: { isValid: false, isTouched: false, isFocused: false, placeholder: "IBAN", type: "text" },
        model: { isValid: false, isTouched: false, isFocused: false, placeholder: "Model", type: "text" },
        reference_number: { isValid: false, isTouched: false, isFocused: false, placeholder: "Reference number", type: "text" },
        month_year: { isValid: false, isTouched: false, isFocused: false, placeholder: "Name", type: "month" },
        date: { isValid: false, isTouched: false, isFocused: false, placeholder: "Name", type: "date" }
    }

    const [stateArray, setStateArray] = useState(validateStatus);


    useEffect(() => { //koristili smo za update
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if (post) {
            setPostData(post);
            if (currentId) {
                const validateStatusCopy = { ...stateArray }
                for (let key in validateStatusCopy) {
                    validateStatusCopy[key].isValid = true;
                    validateStatusCopy[key].isTouched = true;
                    validateStatusCopy[key].isFocused = true;
                }
            };
        }
    }, [post]); // za popunit podatke u formi(useefeeect korisit se za prikazat nesto ako se nesto promijeni) ako se forma promijeni od nicega u pravi post

    //console.log(postData.payer_name);
    const handleSubmit = (e) => {
        e.preventDefault();

        const copyCurrentState = { ...stateArray };

        if (copyCurrentState.payer_name.isValid && copyCurrentState.payer_surname.isValid && copyCurrentState.payer_adress.isValid && copyCurrentState.payer_postNu_city.isValid && copyCurrentState.title.isValid &&
            copyCurrentState.bill_adress.isValid && copyCurrentState.bill_postNu_city.isValid && copyCurrentState.amount.isValid && copyCurrentState.IBAN.isValid && copyCurrentState.model.isValid && copyCurrentState.reference_number.isValid
            && copyCurrentState.month_year.isValid && copyCurrentState.date.isValid) {

            if (currentId) {

                dispatch(updatePost(currentId, { ...postData, name: user ?.result ?.name}));
            } else {
                dispatch(createPost({ ...postData, name: user ?.result ?.name})); //ako je currentId null dispatchamo createPost()
            }
            clear();
            history.push("/posts");
        }
        else
            setErrorMessage(true);
    }


    const clear = () => {
        setCurrentId(null);
        setPostData({ payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: '' });
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
            case "payer_name":
                return checkField(e, /^[a-zA-Z][a-zA-Z\s]*$/)
            case "payer_surname":
                return checkField(e, /^[a-zA-Z][a-zA-Z\s]*$/)
            case "amount":
                return checkField(e, /^[0-9]*\.?[0-9]*$/)
            case "IBAN":
                return checkField(e, /^[A-Z]{2}[0-9]{19,23}$/)
            case "model":
                return checkField(e, /^[A-Z]{2}[0-9]{2}$/)
            case "reference_number":
                return checkField(e, /^[0-9-]+$/)
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
            <Input key={name.id}
                key1={name.id}
                value={postData[name.id]}
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


    return (
        <div className="body">
            <div className="form_pic">
                <div className="container2">
                    <h1 className="titles"  >{currentId ? 'Editing the' : 'Add a new'} bill</h1>
                    {formElements}
                    <button type="button" className="cancel" style={{ marginBottom: "10px" }} onClick={() => { history.push("/"); clear(); }}>Cancel</button>
                    <button type="submit" className="submit" style={{ marginBottom: "10px" }} onClick={(e) => { handleSubmit(e) }}>Submit</button><br />
                    {errorMessage && <span style={{ fontWeight: "bold", color: "white" }}>All fields must be filled !</span>}
                </div>
            </div>
        </div>
    );
}

export default Form;