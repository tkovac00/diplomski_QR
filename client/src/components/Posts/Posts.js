import React, { useState } from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './styles.css';
import PostFilter from './PostFilter'
import PostGraph from './PostGraph'
import { useHistory} from "react-router-dom";
import Form from "../Form/Form"


//sa use selector dobavljamo podatke koje smo dohvatili u reducers/posts.js
const Posts = ({ currentId,setCurrentId,IsEditing, setIsEditing, setIsPostEditing}) => {

    const posts = useSelector((state) => state.posts); //imamo pristup stanju (radi store-a) i vracamo state.posts jer su u reducers/index.js vraca posts
    // fetching data from redux - (gore) posts
    const [filteredYear, setFilteredYear] = useState('---');
    const [filteredMonth, setFilteredMonth] = useState('---');
    const [IsForm, setIsForm] = useState('');
    const history = useHistory();

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    }

    const filterChangeHandler2 = (selectedMonth) => {
        setFilteredMonth(selectedMonth);
    }

    const filteredPost = posts.filter(post => {
        if (filteredYear === '---' && filteredMonth === '---')
            return post;
        else if(filteredYear!=='---' && filteredMonth==='---')
            return post.date.slice(0, 4) === filteredYear;
        else if(filteredMonth!=='---' && filteredYear==='---')
            return post.month_year.slice(5,7) === filteredMonth;
        else if(filteredMonth!=='---' && filteredYear!=='---'){
            return post.date.slice(0, 4) === filteredYear && post.month_year.slice(5,7) === filteredMonth;
            }
        else
            return post;

    });

    return (
        
         
        !posts.length ? <CircularProgress /> : ( //ako nema postova post.length=0 onda circular(!0=1), inace ovo u zagradama
            <div>
                {/* {IsForm && <Form currentId={currentId} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />} */}
                <PostFilter selected={filteredYear} selectedMonth={filteredMonth} onChangeFilter={filterChangeHandler} onChangeFilter2={filterChangeHandler2} />
                <PostGraph posts={filteredPost} />
                <div className="Main_grid">
                    {
                        (filteredPost.length === 0 ? <h2 className='expenses-list__fallback'>Found no bills.</h2> :
                            filteredPost.map((post) => (
                                <div key={post._id} >
                                    <Post post={post} setCurrentId={setCurrentId} setIsEditing={setIsEditing} setIsForm={setIsForm} />
                                </div>))
                        )

                    }
                </div>
                <button type="button" className="cancel" style={{textAlign: 'center'}} onClick={()=>{history.push("/");setIsPostEditing(false);}}>Hide the list</button>
            </div>

        )
    );
}

export default Posts;