import React from 'react';
import './graph.css';
import GraphBar from './graphBar';
import PostFilter from '../Posts/PostFilter';

const Graph = ({ totalAmount, datas, selected, selectedMonth, onChangeFilter, onChangeFilter2 }) => {
    const dataValues = datas.map(data => data.value); //.map vraca niz

    const maximum = Math.max(...dataValues);

    return (
        <div className='graph1'>
            <div className='amount'>
                
            </div>
            <PostFilter totalAmount={totalAmount} datas={dataValues} selected={selected} selectedMonth={selectedMonth} onChangeFilter={onChangeFilter} onChangeFilter2={onChangeFilter2} />
            <div className='graph'>
                {datas.map(data =>
                    <GraphBar
                        key={data.label}
                        value={data.value}
                        maxValue={maximum}
                        label={data.label}
                    />)}

            </div>
        </div>
    )
};

export default Graph;