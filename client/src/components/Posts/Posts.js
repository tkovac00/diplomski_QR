import React, { useState } from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './styles.css';
import PostFilter from './PostFilter'
import PostGraph from './PostGraph'


//sa use selector dobavljamo podatke koje smo dohvatili u reducers/posts.js
const Posts = ({ setCurrentId, setIsEditing }) => {

    const posts = useSelector((state) => state.posts); //imamo pristup stanju (radi store-a) i vracamo state.posts jer su u reducers/index.js vraca posts
    // fetching data from redux - (gore) posts
    const [filteredYear, setFilteredYear] = useState('---');

    const filterChangeHandler = (selectedYear) => {
        setFilteredYear(selectedYear);
    }

    const filteredPost = posts.filter(post => {
        if (filteredYear === '---')
            return post;
        else
            return post.date.slice(0, 4) === filteredYear;

    });

    return (

        !posts.length ? <CircularProgress /> : ( //ako nema postova post.length=0 onda circular(!0=1), inace ovo u zagradama
            <div>

                <PostFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
                <PostGraph posts={filteredPost} />
                <div className="Main_grid">
                    {
                        (filteredPost.length === 0 ? <h2 className='expenses-list__fallback'>Found no bills.</h2> :
                            filteredPost.map((post) => (
                                <div key={post._id}>
                                    <Post post={post} setCurrentId={setCurrentId} setIsEditing={setIsEditing} />
                                </div>))
                        )

                    }
                </div>
            </div>

        )
    );
}

export default Posts;