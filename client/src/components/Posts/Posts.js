import React, { useState, useEffect } from 'react';
import { getPosts } from '../../actions/posts';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './styles.css';
import PostGraph from './PostGraph'
import { useHistory } from "react-router-dom";

/* eslint-disable */
//sa use selector dobavljamo podatke koje smo dohvatili u reducers/posts.js
const Posts = ({ currentId, setCurrentId, IsEditing, setIsEditing, setIsPostEditing }) => {
   
    const posts = useSelector((state) => state.posts); //imamo pristup stanju (radi store-a) i vracamo state.posts jer su u reducers/index.js vraca posts
    // fetching data from redux - (gore) posts
    const [filteredYear, setFilteredYear] = useState('Year');
    const [filteredMonth, setFilteredMonth] = useState('Month');
    const [IsForm, setIsForm] = useState('');
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch(); //hook
    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    }

    const filterChangeHandler2 = (selectedMonth) => {
        setFilteredMonth(selectedMonth);
    }
    useEffect(() => { //pozovemo f-ju,prvi arg, je callback funkcija,a drugi niz  --- kao mount i 
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const filteredPost = posts.filter(post => {
        if (filteredYear === 'Year' && filteredMonth === 'Month')
            return post;
        else if (filteredYear !== 'Year' && filteredMonth === 'Month')
            return post.date.slice(0, 4) === filteredYear;
        else if (filteredMonth !== 'Month' && filteredYear === 'Year')
            return post.month_year.slice(5, 7) === filteredMonth;
        else if (filteredMonth !== 'Month' && filteredYear !== 'Year') {
            return post.date.slice(0, 4) === filteredYear && post.month_year.slice(5, 7) === filteredMonth;
        }
        else
            return post;

    });

    const total = filteredPost.map(post => {
       if(user ?.result ?.googleId === post ?.creator || user ?.result ?._id === post ?.creator) 
       return post.amount;
       else{
            return 0;
       }
});


    let totalAmount = 0;
for (let i = 0; i < total.length; i++) {
    totalAmount += + total[i];
}

return (


    !posts.length ? <CircularProgress /> : (  // ako nema postova post.length=0 onda circular(!0=1), inace ovo u zagradama
        <div className="body">
            <div className="head">


                <h1>Welcome to your finance history</h1>
             
                <PostGraph totalAmount={totalAmount} posts={filteredPost} selected={filteredYear} selectedMonth={filteredMonth} onChangeFilter={filterChangeHandler} onChangeFilter2={filterChangeHandler2} />
            </div>
            <div className="wrapper">
                <div className="Main_grid">
                    {
                        (totalAmount === 0 ? <h2 className='expenses-list__fallback'>Found no bills.</h2> :
                            filteredPost.map((post) => (
                                <div key={post._id} >
                                    {(user ?.result ?.googleId === post ?.creator || user ?.result ?._id === post ?.creator) && <Post post={post} setCurrentId={setCurrentId} setIsEditing={setIsEditing} setIsForm={setIsForm} />}
                                </div>))
                        )

                    }
                </div>
                {true ? (<div className="hide"><button type="button" className="hide_button" onClick={() => { history.push("/form"); setIsPostEditing(false); }}>Add a new bill</button></div>) : <h1> </h1>}
            </div>
        </div >
    )
);
}

export default Posts;