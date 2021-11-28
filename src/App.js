import { useEffect, useState } from 'react';
import map from './assets/map_USA.svg';
import { TextField, Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import Stopwatch from './components/StopWatch';
import jsonUSA from './components/usa.json';

import './App.css';

function App() {
  const [startStopWatch, setStartStopWatch] = useState(false);
  const [arrayUSA, setArrayUSA] = useState(new Map());
  const [arrayUSAResult, setArrayUSAResult] = useState([]);

  const initialiseMap = () => {
    const mapUSA = new Map();

    jsonUSA.states.forEach(item => {
      mapUSA.set(item.number, item.name);
    });
    Array(mapUSA.size).fill(0).forEach((item, index) => {
      arrayUSAResult[index] = {name: "", number: index + 1};
    });
    setArrayUSA(mapUSA);
  }

  const handleChangeValues = (e, item) => {
    e.preventDefault();
    let result = arrayUSAResult;   // copy state
    result = result.map((el) => {  // map array to replace the old comment with the new one
      if (el.number === item.number) el.name = e.target.value;
      return el;
    });
    setArrayUSAResult(result); // set state with new comment
  }
  
  const verifyResults = () => {
    let result = true;
    arrayUSAResult.slice(0).map((item, index) => {
      if (item.name !== arrayUSA.get(index + 1)) result = false;
      console.log("result " + item.name);
      console.log("verification " + arrayUSA.get(index + 1));      
    });
    console.log(result);
  }

  useEffect(() => {
    initialiseMap();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <div className="map-wrapper">
          <img src={map} className="map" alt="Carte" />
        </div>
        <div className="main-content">
          <div className="propositions-wrapper">
            <div className="propositions-left">
              {arrayUSAResult.slice(0, arrayUSAResult.length / 2).map((item) =>
                <TextField id="outlined-basic" label={item.number} variant="outlined" key={item.number} value={item.name} name={"input" + item.number} onChange={(e) => {handleChangeValues(e, item); }} />
              )}
            </div>
            <div className="propositions-right">
              {arrayUSAResult.slice(arrayUSAResult.length / 2, arrayUSAResult.length).map((item) =>
                <TextField id="outlined-basic" label={item.number} variant="outlined" key={item.number} value={item.name} name={"input" + item.number} onChange={(e) => {handleChangeValues(e, item); }}/>
              )}
            </div>
            <div className="timer">
              <div className="timer-icon">
                <TimerIcon color="primary" sx={{ fontSize: 40 }} />
              </div>
              <div className="stopwatch">
                <Stopwatch setStart={startStopWatch} />
              </div>
              <div className="btn-start-wrapper">
                <Button className="btn-start" variant="contained" color="primary">
                  GO !
                </Button>
              </div>
            </div>
            <div className="button-wrapper">
              <Button className="button" variant="contained" color="success" onClick={verifyResults}>
                Valider
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
