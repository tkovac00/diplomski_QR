import React, { useState, useEffect } from 'react';
import Input from './input'
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Icon from './icon';
import Fade from 'react-reveal/Fade';
import { signIn, signUp } from '../../actions/auth';
import './styles.css'

/* eslint-disable */
const Auth = ({ isSignup, setIsSignup }) => {

    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const errorM = useSelector((state) => state.auth.authData);
    const initialForm = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if(form.email !== '') setErrorMessage(errorM);
    },[errorM]);

    const user = useState(JSON.parse(localStorage.getItem('profile')));
    const [show_password, setShow_password] = useState(false);
    const history = useHistory();
    const handleShow_password = () => setShow_password((prevShow_password) => !prevShow_password); // akoje false -> true, ako je true -> false
  

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signUp(form, history))

        }
        else {
            dispatch(signIn(form, history))
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp)
        setShow_password(false);
    };

    const googleSuccess = async (res) => {
        const result = res ?.profileObj;  //  ?. se koristi da ne daje error ako nemamo pristup res objektu, nekad ga nece biti pa ce res bit undefined
        const token = res ?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/');
        }
        catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Log In was unsuccessful");
    };

    return (
        <div className="body">
            <div className="container3">

                <form className="authForm" onSubmit={handleSubmit} >
                    <h2>{isSignup ? "Sign up" : "Log in"}</h2>
                    {isSignup && (
                        <div>
                            <Input name="firstName" placeholder="First Name" handleChange={handleChange} autofocus />
                            <Input name="lastName" placeholder="Last Name" handleChange={handleChange} />
                        </div>
                    )}
                    <Input name="email" placeholder="E-mail" handleChange={handleChange} type="email" />
                    <Input name="password" placeholder="Password" handleChange={handleChange} type={show_password ? "text" : "password"} handleShowPassword={handleShow_password} />
                    {isSignup && <Input name="confirmPassword" placeholder="Repeat Password" handleChange={handleChange} type="password" />}

                    {!user ?.profile ?._id  && errorMessage !== '' && <Fade bottom collapse><span style={{ fontWeight: "bold", color: "red", marginBottom: "0px" }}>{errorMessage}</span></Fade>}

                    <div className="auth_buttons">
                        <button type="submit" className="login" style={{ marginBottom: "10px" }}>{isSignup ? "SIGN UP" : "LOG IN"}</button><br />
                        <GoogleLogin
                            clientId="845356113527-ifppdgm7r7qccrt2olgq6l5nh88nred4.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button
                                    className="google_button"
                                    onClick={renderProps.onClick}
                                    color="primary"
                                    startIcon={<Icon />}
                                    variant="contained"
                                >Google Log In </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        /><br />
                        <button className="accountButton" onClick={switchMode}>{isSignup ? "Already have an account? Log in" : "Don't have an account? Sign Up"}</button><br />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth;