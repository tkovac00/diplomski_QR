import React from 'react';
import Graph from '../Graph/graph'

const PostGraph = (props) => {
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
        const postMonth = post.month_year.slice(5, 7)-1;
        graphData[postMonth].value += + post.amount;
    }
    return <Graph datas={graphData} />
    
};

export default PostGraph;