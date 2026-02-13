import { useState, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

const ResponseDisplay = ({ response }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    loadVoices();
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup: Stop speech on unmount
    return () => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  }, []);

  const cleanText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\n+/g, '. ')
      .replace(/<[^>]+>/g, '')
      .trim();
  };

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText(response));
    utterance.lang = 'en-US';

    // Select a female voice
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Female') ||
        voice.name.includes('Zira')
    ) || voices[0];

    utterance.voice = femaleVoice;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Response</h2>
        <button
          onClick={handleTextToSpeech}
          className="p-3 rounded-full bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-300 dark:hover:bg-indigo-700 transition-colors"
          aria-label={isSpeaking ? 'Stop speech' : 'Read response aloud'}
          disabled={!voices.length}
        >
          {isSpeaking ? (
            <SpeakerXMarkIcon className="w-5 h-5" />
          ) : (
            <SpeakerWaveIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div
        className="prose prose-indigo max-w-none text-gray-800 dark:text-gray-200 text-base sm:text-lg"
        dangerouslySetInnerHTML={{
          __html: response
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700 dark:text-indigo-300">$1</strong>')
            .replace(/\n\n/g, '<br/><br/>')
            .replace(/\n/g, '<br/>'),
        }}
      />
    </div>
  );
};

export default ResponseDisplay;