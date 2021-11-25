import map from './assets/map_USA.svg';
import { TextField, Button } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import Stopwatch from './components/StopWatch';
import './App.css';

function App() {

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

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
                <TextField id="outlined-basic" label={i + 1} variant="outlined" />
              )}
            </div>
            <div className="propositions-right">
              {Array(25).fill(0).map((el, i) =>
                <TextField id="outlined-basic" label={26 + i} variant="outlined" />
              )}
            </div>
            <div className="timer">
              <div className="timer-icon">
                <TimerIcon color="primary" sx={{ fontSize: 40 }} />
              </div>
              <div className="stopwatch">
                <Stopwatch />
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
