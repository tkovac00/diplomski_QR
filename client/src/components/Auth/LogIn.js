// import React, { useState } from 'react';
// import Input from '../Form/Input'
// import { useHistory } from "react-router-dom";
// import './styles.css'

// const LogIn = () => {
//     const state = null;

//     const [user, setUser] = useState({
//         email: '', password: ''
//     });
//     const history = useHistory();
//     const [errorMessage, setErrorMessage] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const validateStatus = {
//         email: { isValid: false, isTouched: false, isFocused: false, placeholder: "E-mail", type: "email" },
//         password: { isValid: false, isTouched: false, isFocused: false, placeholder: "Password", type: "password" },
//     }


//     const [stateArray, setStateArray] = useState(validateStatus);


//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const copyCurrentState = { ...stateArray };

//         if (copyCurrentState.email.isValid && copyCurrentState.password.isValid) {
//             history.push("/");
//         }
//         else
//             setErrorMessage(true);
//     }


//     const checkField = (e, regex) => {
//         if (!e.target.value.match(regex) || e.target.value === "") {
//             return false;
//         }
//         else
//             return true;
//     }

//     const checkInput = (e) => {

//         switch (e.target.name) {
//             case "email":
//                 return checkField(e, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
//                 break;
//             default:
//                 if (e.target.value !== "") {
//                     return true;
//                 }
//                 else
//                     return false;
//         }
//     }

//     const onBlurEvent = (name) => {
//         const copyCurrentState = { ...stateArray };
//         copyCurrentState[name].isFocused = true;

//         setStateArray(copyCurrentState)
//     }

//     const changeHandler = (name, e) => {
//         const copyUserData = { ...user };
//         copyUserData[name] = e.target.value;
//         setUser(copyUserData);
//         const copyCurrentState = { ...stateArray };
//         copyCurrentState[name].isValid = checkInput(e);

//         setStateArray(copyCurrentState)
//     }

//     const onTouchEvent = (name) => {
//         const copyCurrentState = { ...stateArray }
//         copyCurrentState[name].isTouched = true

//         setStateArray(copyCurrentState)
//     }
//     // radimo nizarray od  statetArray sa payer_name{isValid,isFocused,isTouched vrijednostima }...
//     const array = []
//     for (let key in stateArray) {
//         array.push({
//             id: key,        //key od stateArray(npr. payer_name)
//             info: stateArray[key] // info = objekt od statearray[payer_name] -> {isValid,isFocused,isTouched vrijednostima }
//         })
//     }

//     let formElements = array.map(name => { //name.id=payer_name, name.info= {isValid,isFocused,isTouched}
//         return (
//             <Input key={name.id}
//                 key1={name.id}
//                 value={user[name.id]}
//                 isValid={name.info.isValid}
//                 isFocused={name.info.isFocused}
//                 isTouched={name.info.isTouched}
//                 placeholder={name.info.placeholder}
//                 type={name.info.type}
//                 setTouched={() => onTouchEvent(name.id)}
//                 setBlured={() => onBlurEvent(name.id)}
//                 setChange={(e) => { changeHandler(name.id, e) }}
//             />
//         )
//     })

//     return (
//         <div className="container2">
//             <h5>Log in</h5>

//             {formElements}

//             <button type="button" className="cancel" style={{ marginBottom: "10px" }} onClick={() => { }}>Cancel</button>
//             <button type="submit" className="submit" style={{ marginBottom: "10px" }} onClick={(e) => { handleSubmit(e) }}>Log In</button><br />
//             {errorMessage && <span style={{ fontWeight: "bold", color: "white" }}>All fields must be filled !</span>}
//         </div>
//     )
// }

// export default LogIn;