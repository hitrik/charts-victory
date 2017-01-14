import React, {Component} from 'react';
import './App.css';
//import Rx from 'rx';
//import 'rx-dom';
import * as data from './data.json';
//import {timeParse} from "d3-time-format";
//import {tsv} from "d3-request";
//import {scaleTime} from "d3-scale";
//import {format} from "d3-format";
let Chart = require('react-d3-core').Chart;
let LineChart = require('react-d3-basic').LineChart;


let d, minD = 0, maxD = 0;

function moveToArray(obj) {
    let arr = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            let innerObj = {
                date: i,
                timestamp: +new Date(i),
                data: obj[i]
            };
            arr.push(innerObj);
        }
    }
    return arr;
}

// let data$ = Rx.Observable.from(moveToArray(data))
//     .filter(item => item.data.action === 'operation')
//     .toArray()
//     .map(item => item.sort((a, b) => {
//         if (a.timestamp < b.timestamp) {
//             return -1;
//         }
//         if (a.timestamp > b.timestamp) {
//             return 1;
//         }
//         return 0;
//     }))
//     .subscribe(data => {
//         d = data;
//         minD = new Date(data[0].timestamp);
//         maxD = new Date(data[data.length - 1].timestamp);
//         console.log(minD, maxD);
//     });


let dataFake = [
    {
        value: 1,
        timestamp: 12828
    },
    {
        value: 4,
        timestamp: 14459
    },
    {
        value: 5,
        timestamp: 16676
    },
    {
        value: 3,
        timestamp: 12338
    },
];
let width = 700,
    height = 350,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "User sample",
    chartSeries = [
        {
            field: 'BMI',
            name: 'BMI',
            color: '#ff7f0e'
        }
    ],
    x = function(d) {
        return +d.value || 0;
    };



class App extends Component {

    render() {
        return <Chart
            title={title}
            width={width}
            height={height}
            margins= {margins}
        >
            <LineChart
                margins= {margins}
                title={title}
                data={dataFake}
                width={width}
                height={height}
                chartSeries={chartSeries}
                x={x}
            />
        </Chart>;
    }
}

export default App;

