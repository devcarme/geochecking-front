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
  const [arrayUSAResult, setArrayUSAResult] = useState(new Map());
  const [values, setValues] = useState([])

  const initialiseMap = () => {
    const mapUSA = new Map();

    jsonUSA.states.forEach(item => {
      mapUSA.set(item.number, item.name);
    });
    setArrayUSA(mapUSA);
  }

  const handleChangeValues = (index, value) => {
    const mapTmp = new Map(arrayUSAResult);
    mapTmp.set(index, value);
    setArrayUSAResult(mapTmp);
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
              {Array(25).fill(0).map((el, i) =>
                <TextField id="outlined-basic" label={i + 1} variant="outlined" key={i + 1} value={values[i + 1]} name={values[i + 1]} onChange={handleChangeValues.bind(this, i + 1)} />
              )}
            </div>
            <div className="propositions-right">
              {Array(25).fill(0).map((el, i) =>
                <TextField id="outlined-basic" label={i + 26} variant="outlined" key={i + 26} value={values[i + 26]} name={values[i + 26]} onChange={handleChangeValues.bind(this, i + 26)}/>
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
              <Button className="button" variant="contained" color="success">
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
