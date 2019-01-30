/* eslint-disable no-undef */

let timerId = null;
let interval = 0;


self.onmessage = (e) => {
  if (e.data === 'start') {
    postMessage('tick');
    timerId = setInterval(() => { postMessage('tick'); }, interval);
  } else if (e.data.interval) {
    interval = e.data.interval;
    if (timerId) {
      clearInterval(timerId);
      timerId = setInterval(() => { postMessage('tick'); }, interval);
    }
  } else if (e.data === 'stop') {
    clearInterval(timerId);
    timerId = null;
  }
};
