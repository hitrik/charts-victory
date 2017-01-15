import React, {Component} from 'react';
import './App.css';
import Rx from 'rx-lite';
import * as dataRaw from './data.json'
import * as V from 'victory';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel, VictoryZoom, VictoryTooltip, VictoryTheme } from 'victory';

let operation, payment, withdraw, minD = 0, maxD = 0;

function moveToArray(obj) {
    let arr = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            let innerObj = {
                date: i,
                label: `${new Date(i)}\n${obj[i].balance}`,
                timestamp: +new Date(i),
                value: obj[i].balance,
                action: obj[i].action
            };
            arr.push(innerObj);
        }
    }
    return Rx.Observable.from(arr);
}

function filterObserver(obs$, param) {
    return obs$.filter(item => item.action === param)
        .toArray()
        .map(item => item.sort((a, b) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            if (a.timestamp > b.timestamp) {
                return 1;
            }
            return 0;
        }));
}

let operation$ = filterObserver(moveToArray(dataRaw), 'operation');
let payment$ = filterObserver(moveToArray(dataRaw), 'payment');
let withdraw$ = filterObserver(moveToArray(dataRaw), 'withdraw');
    Rx.Observable.zip(operation$, payment$, withdraw$)
    .subscribe(data => {
        operation = data[0];
        payment = data[1];
        withdraw = data[2];
        // minD = new Date(data[0].timestamp);
        // maxD = new Date(data[data.length - 1].timestamp);
        console.log(operation, payment, withdraw);
    });




let margin = { top: 20, right: 20, bottom: 20, left: 0 };

class App extends Component {

    render() {
        return (
        <div>
            <VictoryZoom>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={800}
                    height={350}>
                    <VictoryTooltip style={
                        {width: 40}
                    } />
                    <VictoryAxis
                        style={{
                            axisLabel: {fontSize: 15, padding: 5 },
                            tickLabels: {fontSize: 7, padding: 10, angle: '-60'}
                        }}
                        tickCount={10}
                        tickFormat={x => {
                            let date = new Date(x);
                            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
                                ${date.getDay()+1}.${date.getMonth()+1}.${date.getFullYear()}`;
                        }} />
                    <VictoryAxis
                        tickFormat={y => (`${y/1000}K`)}
                        dependentAxis />
                    <VictoryLine
                        x="timestamp"
                        y="value"
                        standalone={true}
                        labelComponent={
                            <VictoryTooltip />
                        }
                        style={{
                            data: {stroke: 'maroon', strokeWidth: 1}
                        }}
                        data={operation} />
                    <VictoryLine
                        x="timestamp"
                        y="value"
                        standalone={true}
                        labelComponent={
                            <VictoryTooltip />
                        }
                        style={{
                            data: {stroke: 'green', strokeWidth: 2}
                        }}
                        data={payment} />
                    <VictoryLine
                        x="timestamp"
                        y="value"
                        standalone={true}
                        labelComponent={
                            <VictoryTooltip />
                        }
                        style={{
                            data: {stroke: 'orange', strokeWidth: 3}
                        }}
                        data={withdraw} />
                </VictoryChart>
            </VictoryZoom>
        </div>
        );
    }
}

export default App;
