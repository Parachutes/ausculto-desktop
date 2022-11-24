import logo from './logo.svg';
import './App.css';
import React, {Component, PureComponent, useState, useEffect} from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const 

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      heartsound : '',
      chartdict: {
        datasets: [
          {
            label: 'A dataset',
            data: Array.from({ length: 100 }, () => ({
              x: 1,
              y: 2,
            })),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      }
    }
    this.data = {
      datasets: [
        {
          label: 'A dataset',
          data: Array.from({ length: 100 }, () => ({
            x: 1,
            y: 2,
          })),
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };
    // this.chartdatadict = {
    //   labels: [],
    //   datasets: []
    // }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
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
      // set to state
      
      .then(res => {
        var text = res['data']
        var arr = text.substring(1, text.length - 1).split(',').map(parseFloat);
        var data = Array.from({ length: 10 }, () => ({x: 1,y: 2}))
        if (typeof(arr) !== 'undefined') {
          data = arr.map((value, index) => ({x: index, y: value}));
        }
        // console.log(data);
        this.setState({
          data: arr,
          heartsound: res.heartsound,
          chartdict: {
            // datasets: [
            //   {
            //     label: 'A dataset',
            //     data: Array.from({ length: 100 }, () => ({
            //       x: 1,
            //       y: 2,
            //     })),
            //     backgroundColor: 'rgba(255, 99, 132, 1)',
            //   },
            // ],
            datasets: [
              {
                label:'Heart Sound wave form',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 1)',
              },
            ],
          }
          // datasets: [
            //   {
            //     label:'Heart Sound wave form',
            //     data: data,
            //     backgroundColor: 'rgba(255, 99, 132, 1)',
            //   },
            // ],
          
        })
        // console.log(this.state['data']);
        // console.log(this.state['heartsound']);
        console.log(this.state['chartdict']['datasets'][0]['data']);
        console.log(this.data['datasets'][0]['data'].slice(0,11));
        return res;
        
      })
      .catch(error => console.log(error));

    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render(){
    return (
    
      <div className="App">
        
        
        <p>Presence of heart sound:</p>
        <p>{this.state['heartsound']}</p>
        {/* debug use only
        <p>Heart sound data:</p>
        <p>{this.state['data'].slice(0, 5)}</p> */}
        <p>Heart sound wave form</p>
        <div className="chart-container">
            <Scatter 
            data={this.state['chartdict']}
            options = {{
              scales: {
                x: {
                  beginAtZero: true,
                  max: 1000,
                  min: 0
                },
                y: {
                  beginAtZero: true,
                  min: -500,
                  max: 500
                }
              },
              }}
               />
        </div>
      </div>
    )
  }
}
export default App;
// function App () {
//   const [heartdata, setheartdata] = useState({
//     data: [],
//     heartsound: ''
//   });
//   const [chartdatadict, setchartdatadict] = useState({
//     labels: [],
//     datasets: []
//   });
  
//   useEffect(() => {
//     // for every second
//     const interval = setInterval(() => {
//       // get data from flask server
//       fetch("/data", {
//         method: 'GET',
//         dataType: 'json',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         }
//       })
//       // read as json
//       .then(res => {return res.json()})
//       // .then(res => {console.log(res);return res;})
//       // set to state
//       // .then(res => {setheartdata(res);return res;})
//       // convert data byte string to float arr
//       .then(res => {
//         var text = res['data']
//         var arr = text.substring(1, text.length - 1).split(',').map(parseFloat);
        
//         setheartdata({
//           data: arr,
//           heartsound: res.heartsound
//         })
//         console.log(res.heartsound);
//         console.log(heartdata['heartsound']);
//         return res;
        
//       })
//       .then(res => {
//         setchartdatadict({
//           labels: Array.from(Array(heartdata['data'].length).keys()),
//           datasets: [
//             {
//               label: 'Heart Sound wave form',
//               data: heartdata['data'],
//               borderColor: 'rgb(255, 99, 132)',
//               backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             }
//           ]
//         })

//         // console.log(chartdatadict['labels'].slice(0, 5));
//         return res;
//     })
//       .catch(error => console.log(error));

//     }, 1000);
//     // clear interval
//     return () => clearInterval(interval);
//   }, []);
  
//   return (
    
//     <div className="App">
      
      
//       <p>Presence of heart sound:</p>
//       <p>{heartdata['heartsound']}</p>
//       {/* <p>Heart sound data:</p>
//       <p>{heartdata['data'].slice(0, 5)}</p> */}
//       <p>Heart sound wave form</p>
//       <div className="chart-container">
//           <Line options={options} data={chartdatadict} />;
//       </div>
//     </div>
//   )
// }



// return (
//   <div className='App'>Heart Sound Waveform
//     
//   </div>
// )


