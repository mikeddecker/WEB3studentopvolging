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
  } = useStopwatch({ autoStart: false, onExpire: () => console.warn('onExpire called') });

  let seconden = props.seconden % 60;
  // parsing seconden naar 08 ipv 8
  const minuten = (props.seconden - seconden) / 60;
  if (seconden < 10) { seconden = "0" + seconden; }
  const runningColor = isRunning ? "text-green-500" : "text-red-500";
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Stopwatch tot {minuten}:{seconden}</h1>
      <div style={{ fontSize: '100px' }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p className={`${runningColor}`}>{isRunning ? 'Running' : 'Not running'}</p>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={start}>Start</button>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={pause}>Pause</button>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={reset}>Reset</button>
    </div>
  );
}

export default MyStopwatch;