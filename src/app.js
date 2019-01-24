import './style.css';

const numberControl = document.getElementsByClassName('metronome-bpm-number-control')[0];
const rangeControl = document.getElementsByClassName('metronome-bpm-range-control')[0];
const switchButton = document.getElementsByClassName('metronome-switch')[0];
const volumeControl = document.getElementsByClassName('metronome-volume-control')[0];

function onNumberChange(e){
    const newValue = Number(e.target.value);
    rangeControl.value = newValue;
    console.log('BPM:', newValue);
}

function onRangeValueChange(e){
    const newValue = Number(e.target.value);
    numberControl.value = newValue;
    console.log('BPM:', newValue);
}        

numberControl.addEventListener('input', onNumberChange, false);
rangeControl.addEventListener('input', onRangeValueChange, false);

let isMetronomeOn = false;

function onSwitchButtonClick(e){
    isMetronomeOn = !isMetronomeOn;
    switchButton.textContent = isMetronomeOn ? 'Stop' : 'Start';
}

switchButton.addEventListener('click', onSwitchButtonClick, false);

function onVolumeChange(e){
    console.log('Volume:', volumeControl.value);
}

volumeControl.addEventListener('input', onVolumeChange, false);