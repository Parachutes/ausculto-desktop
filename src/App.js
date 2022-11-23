import logo from './logo.svg';
import './App.css';
import React, {Component, PureComponent, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function App () {
  const [heartdata, setheartdata] = useState({
    data: '',
    heartsound: ''
  });
  useEffect(() => {
    // for every second
    const interval = setInterval(() => {
      // get data from flask server
      fetch("/data", {
        method: 'GET',
        dataType: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      // read as json
      .then(res => {return res.json()})
      .then(res => {console.log(res);return res;})
      // set to state
      .then(res => {setheartdata(res);return res;})
      // convert data byte string to float arr
      .then(res => {
        var text = res['data']
        var arr = text.substring(1, text.length - 1).split(',').map(parseFloat);
        var data = arr.map((value, index) => ({index, value}))
        setheartdata({
          data: data,
          heartsound: res.heartsound
        })
        console.log(data);
        return res;
        
      })
      
      // .then(res => {console.log()})
      .catch(error => console.log(error));

    }, 1000);
    // clear interval
    return () => clearInterval(interval);
  }, []);
  
  return (

    <div className="App">
      
    {/* </ResponsiveContainer> */}
      {/* <p>{heartdata['data'].slice(0, 5)}</p> */}
      <p>Presence of heart sound:</p>
      <p>{heartdata['heartsound']}</p>
      <p>Heart sound data:</p>
      <ResponsiveContainer width='100%' height={50}>
       <LineChart
        width={'90%'}
        height={'90%'}
        data={heartdata['data']}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
export default App;


// return (
//   <div className='App'>Heart Sound Waveform
//     
//   </div>
// )


