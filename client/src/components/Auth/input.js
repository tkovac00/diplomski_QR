import React from 'react';
import './styles.css'


const Input = ({ name, handleChange, placeholder, autoFocus, type, handleShowPassword, errorM }) => (
    <div>
      <input className="auth_input"
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        placeholder={placeholder}
        autoFocus={autoFocus}
        type={type}
      ></input><br />
     
    </div>
);

export default Input;