import React from 'react';
import Graph from '../Graph/graph'

/* eslint-disable */
const PostGraph = (props) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const graphData = [
        { label: 'Jan', value: 0 },
        { label: 'Feb', value: 0 },
        { label: 'Mar', value: 0 },
        { label: 'Apr', value: 0 },
        { label: 'May', value: 0 },
        { label: 'Jun', value: 0 },
        { label: 'Jul', value: 0 },
        { label: 'Aug', value: 0 },
        { label: 'Sep', value: 0 },
        { label: 'Oct', value: 0 },
        { label: 'Nov', value: 0 },
        { label: 'Dec', value: 0 },
    ];

    for (const post of props.posts) {
        if(user ?.result ?.googleId === post ?.creator || user ?.result ?._id === post ?.creator){
        const postMonth = post.month_year.slice(5, 7) - 1;
        graphData[postMonth].value += + post.amount;
        }
        else{
        const postMonth = post.month_year.slice(5, 7) - 1;
        graphData[postMonth].value += + 0;
        }
    }



    return <Graph datas={graphData} totalAmount={props.totalAmount} selected={props.selected} selectedMonth={props.selectedMonth} onChangeFilter={props.onChangeFilter} onChangeFilter2={props.onChangeFilter2} />
};

export default PostGraph;