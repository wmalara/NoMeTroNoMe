export default class SoundPlayer {
    constructor() {
        this.audioCtx = SoundPlayer.buildAudio();
    
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.connect(this.audioCtx.destination);
    
        this.setVolumePercent(100);

        this.soundBuffer = null;
        this.bufferSource = null;
    }

    start() {
        return new Promise((resolve, reject) => {
            if (this.soundBuffer != null){
                resolve();
                return;
            }
            var request = new XMLHttpRequest();

            request.open('GET', 'sticks.wav', true);
            request.responseType = 'arraybuffer';

            request.onload = () => {
                var audioData = request.response;

                this.audioCtx.decodeAudioData(audioData)
                    .then(buffer => {
                        this.soundBuffer = buffer;
                        resolve();
                    }, 
                    e => reject("Error with decoding audio data" + e.err));
            };

            request.send();
        });
    }

    stop() {
        this.bufferSource.stop(0);
    }
    
    playSound() {
        this.bufferSource = this.audioCtx.createBufferSource();
        this.bufferSource.buffer = this.soundBuffer;
        this.bufferSource.connect(this.gainNode);

        this.bufferSource.start(0);    
        this.gainNode.gain.value = this.volume / 100;
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
  