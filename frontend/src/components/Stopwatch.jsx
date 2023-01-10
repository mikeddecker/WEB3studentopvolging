import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch(props) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart:false, onExpire: () => console.warn('onExpire called') });
  
  const seconden = props.seconden % 60;
  const minuten = (props.seconden - seconden) % 60;

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Stopwatch tot {minuten}minuut {seconden}seconden</h1>
      <div style={{fontSize: '100px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default MyStopwatch;