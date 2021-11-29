import { useEffect, useState } from 'react';
import map from './assets/map_USA.svg';
import { TextField, Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import jsonUSA from './components/usa.json';
import ModalResults from './components/ModalResults';
import Box from '@mui/material/Box';

import './App.css';

function App() {
  const [arrayUSA, setArrayUSA] = useState(new Map());
  const [arrayUSAResult, setArrayUSAResult] = useState([]);
  const [open, setOpen] = useState(false);
  const [resultScore, setResultScore] = useState("");
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timeScore, setTimeScore] = useState("");
  const [enableVerify, setEnableVerify] = useState(false);

  const initialiseMap = () => {
    const mapUSA = new Map();

    jsonUSA.states.forEach(item => {
      mapUSA.set(item.number, item.name);
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
    const minutes = ("0" + Math.floor(time / 60000)).slice(-2);
    const seconds = ("0" + Math.floor(time / 1000)).slice(-2);
    const hundredthOfSeconds = ("0" + (time / 10) % 1000).slice(-2);
    setTimeScore(minutes + "m " + seconds + "s " + hundredthOfSeconds + "c");
    let count = 0;
    arrayUSAResult.slice(0).map((item, index) => {
      if (item.name.toUpperCase() === arrayUSA.get(index + 1).toUpperCase()) {
        item.success = "success";
        count++;
      } else {
        item.name = arrayUSA.get(index + 1);
        item.error = true;
      }
    });
    setResultScore(count + " / " + arrayUSA.size);
    setStart(false);
  }

  const handleOpen = () => {
    verifyResults();
    setEnableVerify(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetFields = () => {
    arrayUSAResult.slice(0).map((item, index) => {
      item.name = "";
      item.success = "";
      item.error = false;
    });
  };

  const newTry = () => {
    setEnableVerify(true);
    setTime(0);
    setStart(true);
    Array(arrayUSA.size).fill(0).forEach((item, index) => {
      arrayUSAResult[index] = { name: "", number: index + 1 };
    });
  };

  useEffect(() => {
    initialiseMap();
    let interval = null;
    if (start) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <ModalResults open={open} onClose={handleClose} score={resultScore} timeScore={timeScore} />
        </div>
        <div className="map-wrapper">
          <img src={map} className="map" alt="Carte" />
        </div>
        <div className="main-content">
          <div className="propositions-wrapper">
            <div className="timer">
              <div className="timer-icon">
                <TimerIcon color="primary" sx={{ fontSize: 40 }} />
              </div>
              <div className="stopwatch">
                <span>{("0" + Math.floor(time / 60000)).slice(-2)}:</span>
                <span>{("0" + Math.floor(time / 1000)).slice(-2)}:</span>
                <span>{("0" + (time / 10) % 1000).slice(-2)}</span>
              </div>
              <div className="btn-start-wrapper">
                <Button
                  className="btn-start"
                  variant="contained"
                  color="primary"
                  onClick={newTry}
                  disabled={enableVerify}
                >
                  GO !
                </Button>
              </div>
            </div>
            <div className="propositions-left">
              {arrayUSAResult.slice(0, arrayUSAResult.length / 2).map((item) =>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '15ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={item.error}
                    color={item.success}
                    focused
                    id="outlined-basic"
                    label={item.number}
                    variant="outlined"
                    key={item.number}
                    value={item.name}
                    name={"input" + item.number}
                    onChange={(e) => { handleChangeValues(e, item); }}
                  />
                </Box>
              )}
            </div>
            <div className="propositions-right">
              {arrayUSAResult.slice(arrayUSAResult.length / 2, arrayUSAResult.length).map((item) =>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '15ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={item.error}
                    color={item.success}
                    focused
                    id="outlined-basic"
                    label={item.number}
                    variant="outlined"
                    key={item.number}
                    value={item.name}
                    name={"input" + item.number}
                    onChange={(e) => { handleChangeValues(e, item); }}
                  />
                </Box>
              )}
            </div>
            <div className="button-wrapper">
              <Button
                className="button"
                variant="contained"
                color="success"
                onClick={handleOpen}
                disabled={!enableVerify}
              >
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
