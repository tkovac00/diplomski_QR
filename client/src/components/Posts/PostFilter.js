import React from 'react';
import './PostFilter.css';

const PostFilter = ({ selected, onChangeFilter }) => {

    return (
        <div className='post-filter'>
            <div className='post-filter_control'>
                <label>Filter by year</label>
                <select value={selected} onChange={(event) => { onChangeFilter(event.target.value) }}>
                    <option value='---'>---</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                </select>
                
            </div>
        </div>
    );
};

export default PostFilter;