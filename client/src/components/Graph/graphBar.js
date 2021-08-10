import React from 'react';
import './graphBar.css';

const graphBar = ({value,maxValue,label}) => {
    let barFillHeight = '0%';

    if(maxValue > 0){
        barFillHeight = Math.round((value / maxValue) *100) + '%';
    }

return(
    <div className='graph_bar'>

        <div className='graph_bar_inner'>
            <div className='graph_bar_fill' style={{height: barFillHeight}}></div> 
        </div>

        <div className='graph_bar_label'>{label}</div>
    </div>
)
}

export default graphBar;