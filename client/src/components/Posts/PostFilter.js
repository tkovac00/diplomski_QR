import React from 'react';
import './PostFilter.css';

const PostFilter = ({ selected, onChangeFilter, selectedMonth, onChangeFilter2 }) => {

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

            <div className='post-filter_control'>
                <label>Filter by month</label>
                <select value={selectedMonth} onChange={(event) => { onChangeFilter2(event.target.value) }}>
                    <option value='---'>---</option>
                    <option value='01'>January</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>

            </div>
        </div>
    );
};

export default PostFilter;