export default class Beeper {
    constructor() {
      this.audioCtx = Beeper.buildAudio();
  
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.connect(this.audioCtx.destination);
  
      this.setVolumePercent(100);
    }
  
    scheduleTone(toneFrequency, toneLengthMs, startInMs = 0) {
      // TODO: replace creating oscillator with setting gain to 0
      const oscillator = this.audioCtx.createOscillator();
      oscillator.frequency.value = toneFrequency;
  
      this.gainNode.gain.value = this.volume / 100;
  
      oscillator.connect(this.gainNode);
  
      const audioStartTime = this.audioCtx.currentTime + (startInMs / 1000);
      oscillator.start(audioStartTime);
  
      const audioStopTime = audioStartTime + (toneLengthMs / 1000);
      oscillator.stop(audioStopTime);
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
  