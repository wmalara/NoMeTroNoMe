import './style.css';
import Beeper from './beeper';
import SoundPlayer from './soundPlayer';
import TickWorker from 'worker-loader!./tickworker.js';

const numberControl = document.getElementsByClassName('metronome-bpm-number-control')[0];
const rangeControl = document.getElementsByClassName('metronome-bpm-range-control')[0];
const switchButton = document.getElementsByClassName('metronome-switch')[0];
const volumeControl = document.getElementsByClassName('metronome-volume-control')[0];

const minuteMs = 60000;
const beepToneFrequency = 800;
const beepLengthMs = 30;


const beeper = new Beeper();
const soundPlayer = new SoundPlayer();
let isMetronomeOn = false;
let bmpValue = 60;
let volume = 50;
let timerWorker;

function updateWorkerBpm() {
    timerWorker.postMessage({ interval: minuteMs / bmpValue });
}

function start() {
    isMetronomeOn = true;
    beeper.start();
    soundPlayer.start().then(() => timerWorker.postMessage('start'));    //promise;
}

function stop() {
    isMetronomeOn = false;
    beeper.stop();
    soundPlayer.stop();
    timerWorker.postMessage('stop');
}

function beep() {
    // beeper.playTone(beepToneFrequency, beepLengthMs);
    soundPlayer.playSound();
}


function setupWorker() {
    timerWorker = new TickWorker();

    timerWorker.onmessage = e => {
      if (e.data === 'tick') {
        beep();
      }
    };

    updateWorkerBpm();
  }

  setupWorker();


function onNumberChange(e){
    const newValue = Number(e.target.value);
    rangeControl.value = newValue;
    bmpValue = newValue;
    updateWorkerBpm();
}

function onRangeValueChange(e){
    const newValue = Number(e.target.value);
    numberControl.value = newValue;
    bmpValue = newValue;
    updateWorkerBpm();
}        

numberControl.addEventListener('input', onNumberChange, false);
rangeControl.addEventListener('input', onRangeValueChange, false);


function onSwitchButtonClick(e){
    isMetronomeOn = !isMetronomeOn;
    if (isMetronomeOn) {
        switchButton.textContent = 'Stop';
        start();
    }
    else {
        switchButton.textContent = 'Start';
        stop();
    }
}

switchButton.addEventListener('click', onSwitchButtonClick, false);

function onVolumeChange(e){
    beeper.setVolumePercent(volumeControl.value);
    soundPlayer.setVolumePercent(volumeControl.value);
}

volumeControl.addEventListener('input', onVolumeChange, false);