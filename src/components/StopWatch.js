import ReactStopwatch from 'react-stopwatch';

function Stopwatch ({setStart}) {
  
  return (
    <ReactStopwatch
      autoStart={setStart}
      seconds={0}
      minutes={0}
      hours={0}
      limit="10:00:00"
      onChange={({ hours, minutes, seconds }) => {
        // do something
      }}
      onCallback={() => console.log('Finish')}
      render={({ formatted, hours, minutes, seconds }) => {
        return (
          <div>
            <p>
              { formatted }
            </p>
          </div>
        );
      }}
    />
  )
  }

export default Stopwatch;
