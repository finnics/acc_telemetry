import React, {useState, useEffect} from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import GasBrakeChart from "./components/GasBrakeChart"
import SpeedChart from './components/SpeedChart';
import { useInterval } from "./utils/hooks"
import './App.css';


const client = new W3CWebSocket('ws://127.0.0.1:8081');

const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const filledArray = [...new Array(100)].map(() => {
      return {
        gas:0.5,
        brake:0.5,
        speed: 150,
        time: randomDate(new Date(2012, 0, 1), new Date())
      };
    });
    setData(filledArray)
  }, []);


  useInterval(() => {
    // client.onopen = () => {
    //   console.log('Server Connected');
    // };

    // client.onclose = () => {
    //   console.log('Server Disconnected');
    // };

    // client.onmessage = (message) => {
    //   const telemetryData = JSON.parse(message.data);
    //   setData([...data, telemetryData]);
    // };
    if(data){
      if (data.length > 200) {
        data.shift();
      }
      setData([
        ...data,
        { gas: Math.random(), brake: Math.random(), speed: Math.random() * 100, time: Date.now() },
      ]);
    } else {
      console.log('data is not available')
    }
  }, 1000 / 30);

  return (
    <div className="App">
      <GasBrakeChart data={data}/>
      <SpeedChart data={data}/>
    </div>
  );
}

export default App;
