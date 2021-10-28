import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import decode from 'jwt-decode'
import './styles.css'
import { ReactComponent as MenuIcon } from "../../photos/menu.svg";

/* eslint-disable */
const Header = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();


    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {
        const token = user ?.token;

        //JWT...
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime())
                logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div className="_header">
            <ul className={click ? "web_header active" : "web_header"}>
                <li onClick={closeMobileMenu} className="option "><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                <li onClick={closeMobileMenu} className="option"><NavLink activeClassName={user && "active"} to={user ? "/add-bill" : "/auth"}>Scan QR</NavLink></li>
                <li onClick={() => { closeMobileMenu(); }} className="option "><NavLink activeClassName={user && "active"} to={user ? "/form" : "/auth"}>Fill in the form</NavLink></li>
                <li onClick={closeMobileMenu} className="option "><NavLink activeClassName={user && "active"} to={user ? "/posts" : "/auth"}>Finance history</NavLink></li>
                <li onClick={closeMobileMenu} className=" option"><NavLink activeClassName={user && "active"} to={user ? "/qrs" : "/auth"}>Added bills</NavLink></li>
            </ul>

            {user ?.result ?._id ?
                (
                    <div className="_profile">
                        <div ><Avatar alt={user ?.result.name} src={user ?.result.imageUrl}>{user ?.result.name.charAt(0)}</Avatar></div>
                        <h6 className="_userName" >{user.result.name}</h6>
                        <button className="logout" onClick={logout}>Logout</button>
                    </div>) : user ?.result ?.googleId ?
                        (
                            <div className="_profile">
                                {<div ><Avatar alt={user ?.result.name} src={user ?.result.imageUrl}>{user ?.result.name.charAt(0)}</Avatar></div>}
                                <h6 className="_userName">{user.result.name}</h6>
                                <button className="logout" onClick={logout}>Logout</button>
                            </div>) : (
                            null
                        )}
                             
            <div className="mobile-menu" onClick={handleClick}>
                <MenuIcon className="menu-icon" style={{ fill: "#e5a00d" }} />
            </div>
        </div>

    )
}


export default Header;