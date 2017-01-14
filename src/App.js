import React, {Component} from 'react';
import './App.css';
import Rx from 'rx';
import 'rx-dom';
import * as dataRaw from './data.json'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


let d, minD = 0, maxD = 0;

function moveToArray(obj) {
    let arr = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            let innerObj = {
                date: i,
                timestamp: +new Date(i),
                value: obj[i].balance,
                action: obj[i].action
            };
            arr.push(innerObj);
        }
    }
    return arr;
}

let data$ = Rx.Observable.from(moveToArray(dataRaw))
    .filter(item => item.action === 'operation')
    .toArray()
    .map(item => item.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
            return -1;
        }
        if (a.timestamp > b.timestamp) {
            return 1;
        }
        return 0;
    }))
    .subscribe(data => {
        d = data;
        minD = new Date(data[0].timestamp);
        maxD = new Date(data[data.length - 1].timestamp);
        console.log(minD, maxD);
    });




let margin = { top: 20, right: 20, bottom: 20, left: 0 };

class App extends Component {

    render() {
        return (<LineChart
            width={1200}
            height={600}
            data={d}
            margin={margin}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>);
    }
}

export default App;
