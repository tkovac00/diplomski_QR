import React from 'react';
import './PostFilter.css';
import CurrencyFormat from 'react-currency-format';

const PostFilter = ({ totalAmount, datas, selected, onChangeFilter, selectedMonth, onChangeFilter2 }) => {


    return (
        <div className='post-filter'>
            <h3 style= {{ display: "inline-block", paddingLeft:"10px", paddingTop: "10px"}}>Total: <CurrencyFormat value={totalAmount} displayType={'text'} thousandSeparator={true}/> kn</h3>
           
            <div className='post-filter_control'>
                <select value={selected} onChange={(event) => { onChangeFilter(event.target.value); }}>
                    <option value='Year'>Year</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                </select>

           
                <select value={selectedMonth} onChange={(event) => { onChangeFilter2(event.target.value); }}>
                    <option value='Month'>Month</option>
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