import { LanguageCode } from '../data/translations';

// Map our language codes to Web Speech API locale tags
export const SPEECH_LANG_MAP: Record<LanguageCode, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
};

// Text to Speech
export const speakText = (text: string, lang: LanguageCode = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip HTML / Markdown tags for clean audio readout
  const cleanText = text.replace(/[#*_`]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = SPEECH_LANG_MAP[lang] || 'en-IN';
  utterance.rate = 0.95; // Slightly clearer pace for accessibility
  utterance.pitch = 1.0;

  // Try to find natural voice for Indian English or regional language
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(
    (v) => v.lang === utterance.lang || v.lang.startsWith(lang) || v.lang.includes('IN')
  );
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Speech to Text (Recognition)
export interface SpeechRecognitionHelper {
  start: (onResult: (transcript: string) => void, onError?: (err: any) => void) => void;
  stop: () => void;
  isSupported: boolean;
}

export const createSpeechRecognizer = (lang: LanguageCode = 'en'): SpeechRecognitionHelper => {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return {
      start: () => console.warn('Speech recognition not supported in this browser.'),
      stop: () => {},
      isSupported: false,
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = SPEECH_LANG_MAP[lang] || 'en-IN';

  let active = false;

  return {
    isSupported: true,
    start: (onResult: (transcript: string) => void, onError?: (err: any) => void) => {
      if (active) return;
      active = true;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (onError) onError(event.error);
        active = false;
      };

      recognition.onend = () => {
        active = false;
      };

      try {
        recognition.start();
      } catch (err) {
        console.error(err);
        active = false;
      }
    },
    stop: () => {
      if (active) {
        recognition.stop();
        active = false;
      }
    },
  };
};
