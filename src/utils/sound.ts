class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    // AudioContext is initialized lazily on first sound play to satisfy autoplay policies
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val && !this.ctx) {
      this.initCtx();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private initCtx() {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser", e);
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, volume: number) {
    if (!this.enabled) return;
    
    if (!this.ctx) {
      this.initCtx();
    }
    
    if (!this.ctx) return;

    // Resume context if suspended (browser autoplay restriction)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      // Exponential decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Failed to play audio tone", e);
    }
  }

  public playHoverBlip() {
    // High-pitched, very soft, brief sine wave
    this.playTone(987.77, 'sine', 0.08, 0.03); // B5 note
  }

  public playClickPop() {
    // Quick mechanical click/pop feedback
    this.playTone(329.63, 'triangle', 0.06, 0.08); // E4 note
  }

  public playSuccessChime() {
    if (!this.enabled) return;
    if (!this.ctx) {
      this.initCtx();
    }
    if (!this.ctx) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;
      // Synthesize an upbeat major chord arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const gainNode = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.07);

        gainNode.gain.setValueAtTime(0.05, now + index * 0.07);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.07 + 0.25);

        osc.connect(gainNode);
        gainNode.connect(this.ctx!.destination);

        osc.start(now + index * 0.07);
        osc.stop(now + index * 0.07 + 0.3);
      });
    } catch (e) {
      console.warn("Failed to play success chime", e);
    }
  }
}

// Instantiate SoundEngine on client-side only
const soundEngine = typeof window !== 'undefined' ? new SoundEngine() : null;
export default soundEngine;
