import React from 'react';
import './styles.css';

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
                return "Only letters"
            case "payer_surname":
                return "Only letters"
            case "amount":
                return "Only digits"
            case "IBAN":
                return "Correct format (e.g.) : HR1234567891234567891"
            case "model":
                return "Correct format (e.g.) : HR00"   
            case "reference_number":
                return "Correct format (e.g.) : 2706-153-2021"
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
            ></input><br/>
            {isFocused && isTouched && !isValid && <span style={{fontWeight:"bold"}}>{errorMessage(key1)}</span>}
        </div>
      
    )

}

export default Input;