class SpeechController {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.utterance = null;
    this.onStateChange = null;
    this.currentArticleId = null;
    this.isPlaying = false;
    this.isPaused = false;
  }

  speak(text, articleId, onEndCallback = null) {
    if (!this.synth) return;

    this.stop();

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.rate = 1.0;
    this.utterance.pitch = 1.0;
    this.utterance.lang = 'en-IN'; // Indian English accent if available

    const voices = this.synth.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India')) ||
                         voices.find(v => v.lang.includes('en-GB')) ||
                         voices.find(v => v.lang.includes('en'));
    if (englishVoice) {
      this.utterance.voice = englishVoice;
    }

    this.currentArticleId = articleId;
    this.isPlaying = true;
    this.isPaused = false;

    this.utterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      if (this.onStateChange) this.onStateChange({ isPlaying: false, isPaused: false, articleId: null });
      if (onEndCallback) onEndCallback();
    };

    this.utterance.onerror = () => {
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      if (this.onStateChange) this.onStateChange({ isPlaying: false, isPaused: false, articleId: null });
    };

    if (this.onStateChange) {
      this.onStateChange({ isPlaying: true, isPaused: false, articleId });
    }

    this.synth.speak(this.utterance);
  }

  pause() {
    if (this.synth && this.isPlaying) {
      this.synth.pause();
      this.isPaused = true;
      if (this.onStateChange) {
        this.onStateChange({ isPlaying: true, isPaused: true, articleId: this.currentArticleId });
      }
    }
  }

  resume() {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      if (this.onStateChange) {
        this.onStateChange({ isPlaying: true, isPaused: false, articleId: this.currentArticleId });
      }
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentArticleId = null;
      if (this.onStateChange) {
        this.onStateChange({ isPlaying: false, isPaused: false, articleId: null });
      }
    }
  }
}

export const speechController = new SpeechController();
