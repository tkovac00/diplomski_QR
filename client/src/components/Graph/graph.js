import React from 'react';
import './graph.css';
import GraphBar from './graphBar';

const Graph = ({datas}) => {
    const dataValues = datas.map(data => data.value); //.map vraca niz
    const maximum = Math.max(...dataValues);
    return(
        <div className='graph'>
            {datas.map(data => 
            <GraphBar 
            key={data.label}
            value={data.value} 
            maxValue={maximum} 
            label={data.label}
            />
        )}
        </div>
    )
};

export default Graph;