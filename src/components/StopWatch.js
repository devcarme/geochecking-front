import ReactStopwatch from 'react-stopwatch';

const Stopwatch = () => (
  <ReactStopwatch
    autoStart={false}
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
          <p cla>
            { formatted }
          </p>
        </div>
      );
    }}
   />
);

export default Stopwatch;
