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

// Fallback voice locale chains for systems without all regional packs
const FALLBACK_LANG_CHAINS: Record<LanguageCode, string[]> = {
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
  hi: ['hi-IN', 'hi', 'mr-IN', 'en-IN'],
  ta: ['ta-IN', 'ta', 'en-IN'],
  te: ['te-IN', 'te', 'en-IN'],
  bn: ['bn-IN', 'bn-BD', 'bn', 'hi-IN', 'en-IN'],
  mr: ['mr-IN', 'mr', 'hi-IN', 'en-IN'],
  gu: ['gu-IN', 'gu', 'hi-IN', 'en-IN'],
  kn: ['kn-IN', 'kn', 'en-IN'],
};

/**
 * Enhanced Text-to-Speech synthesizer with dynamic regional language detection
 */
export const speakText = (
  text: string,
  lang: LanguageCode = 'en',
  onEnd?: () => void,
  onError?: (err: any) => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment.');
    if (onEnd) onEnd();
    return;
  }

  // Cancel any ongoing speech cleanly
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.error('Speech cancel error', e);
  }

  // Strip Markdown / HTML / decorative characters for clean voice reading
  const cleanText = text
    .replace(/[#*_`~>]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/(\||\+|-|=)/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const targetLocale = SPEECH_LANG_MAP[lang] || 'en-IN';
  utterance.lang = targetLocale;
  utterance.rate = lang === 'en' ? 0.95 : 0.90; // Natural pace for regional Indian languages
  utterance.pitch = 1.0;

  // Voice Selection with Fallback Chain
  const getPreferredVoice = (): SpeechSynthesisVoice | null => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const candidateLocales = FALLBACK_LANG_CHAINS[lang] || [targetLocale, 'en-IN', 'en'];

    for (const locale of candidateLocales) {
      const exactMatch = voices.find(
        (v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase()
      );
      if (exactMatch) return exactMatch;

      const prefixMatch = voices.find(
        (v) => v.lang.toLowerCase().startsWith(locale.toLowerCase().slice(0, 2))
      );
      if (prefixMatch) return prefixMatch;
    }

    // Default fallback to any Indian English or default voice
    return voices.find((v) => v.lang.includes('IN')) || voices[0] || null;
  };

  const assignVoiceAndSpeak = () => {
    const voice = getPreferredVoice();
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error / interrupted:', e);
      if (onError) onError(e);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  // If voices are already loaded
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    assignVoiceAndSpeak();
  } else {
    // Wait for voices to load asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
      assignVoiceAndSpeak();
    };
    // Fallback immediate trigger
    setTimeout(() => {
      if (!window.speechSynthesis.speaking) {
        assignVoiceAndSpeak();
      }
    }, 150);
  }
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.error(e);
    }
  }
};

// Speech to Text (Recognition)
export interface SpeechRecognitionHelper {
  start: (onResult: (transcript: string) => void, onError?: (err: any) => void) => void;
  stop: () => void;
  isSupported: boolean;
}

export const createSpeechRecognizer = (lang: LanguageCode = 'en'): SpeechRecognitionHelper => {
  if (typeof window === 'undefined') {
    return { start: () => {}, stop: () => {}, isSupported: false };
  }

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
        console.warn('Speech recognition error event:', event.error);
        if (onError) onError(event.error);
        active = false;
      };

      recognition.onend = () => {
        active = false;
      };

      try {
        recognition.start();
      } catch (err) {
        console.error('Speech recognizer start error:', err);
        active = false;
      }
    },
    stop: () => {
      if (active) {
        try {
          recognition.stop();
        } catch (e) {
          console.error(e);
        }
        active = false;
      }
    },
  };
};
