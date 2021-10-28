import React from 'react';
import './styles.css';
import Fade from 'react-reveal/Fade';

const Input = ({
    key1,
    value,
    isValid,
    isFocused,
    isTouched,
    placeholder,
    type,
    setTouched,
    setBlured,
    setChange }) => {

    const errorMessage = (name) => {
        switch (name) {
            case "payer_name":
                return "Required (letters only)"
            case "payer_surname":
                return "Required (letters only)"
            case "amount":
                return "Required (digits only)"
            case "IBAN":
                return "Correct format (e.g.) : HR1234567891234567891"
            case "model":
                return "Correct format (e.g.) : HR00"
            case "reference_number":
                return "Correct format (e.g.) : 2706-153-2021"
            case "email":
                return "Please, enter a valid e-mail"
            default: return "Required"
        }
    }
    return (

        <div>
            <input
                name={key1}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={setChange}
                onBlur={setBlured}
                onFocus={setTouched}
            ></input><br />
            {isFocused && isTouched && !isValid && <Fade bottom collapse><span style={{  color: "white", marginTop: "7px"}}>{errorMessage(key1)}</span></Fade>}
        </div>

    )

}

export default Input;