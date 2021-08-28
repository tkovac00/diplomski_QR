import React, { useState, useEffect } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const Input = ({
    key1,
    value,
    isValid,
    isFocused,
    isTouched,
    setTouched,
    setBlured,
    setChange }) => {
    const errorMessage = (name) => {
        switch (name) {
            case "payer_name":
                return "Only digits"
            default: return "Required"
        }
    }
    return (
        <div>
            <input
                type="text"
                name={key1}
                value={value}
                onChange={setChange}
                onBlur={setBlured}
                onFocus={setTouched}
            ></input>
            {isFocused && isTouched && !isValid && <span >{errorMessage(key1)}</span>}
        </div>
    )

}

export default Input;