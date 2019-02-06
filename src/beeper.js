export default class Beeper {
    constructor() {
        this.audioCtx = Beeper.buildAudio();
    
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
    
        this.setVolumePercent(100);

        this.oscillator = null;
    }

    start() {
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.connect(this.gainNode);

        this.gainNode.gain.value = 0;

        this.oscillator.start();
    }

    stop() {
        this.oscillator.stop();
    }
    
    playTone(toneFrequency, toneLengthMs, startInMs = 0) {
        this.oscillator.frequency.value = toneFrequency;
        this.oscillator.type = 'triangle';
    
        this.gainNode.gain.value = this.volume / 100;

        setTimeout(() => {
            this.gainNode.gain.value = 0;
        }, toneLengthMs);
    }
  
    setVolumePercent(volume) {
        const volumeAdjusted = Math.max(0, Math.min(100, volume));
        this.volume = volumeAdjusted;
    }
  
    static buildAudio() {
        // eslint-disable-next-line no-undef
        return new (window.AudioContext || window.webkitAudioContext)();
    }
}
  