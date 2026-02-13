import { useState, useEffect } from 'react';
import EmotionCard from './components/EmotionCard';
import QuestionForm from './components/QuestionForm';
import ResponseDisplay from './components/ResponseDisplay';
import { emotions } from './constants/emotions';
import axios from 'axios';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const App = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEmotion || !question) {
      alert('Please select an emotion and enter a question.');
      return;
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || "dPlLYrPk3xseIEPBzWAjvoJ96DSLonAi";
      const apiUrl = 'https://api.mistral.ai/v1/chat/completions';

      const prompt = `
        The user is feeling the emotion "${selectedEmotion.name}" and has asked: "${question}".
        Provide a relevant shloka from the Bhagavad Gita, its English meaning, and advice on what the user should do about their emotion and situation.
        Format the response as:
        **Shloka**: [Sanskrit shloka]
        **Chapter and Verse**: [Chapter and Verse]
        **Meaning**: [English meaning]
        **Advice**: [Practical advice]
      `;

      const res = await axios.post(
        apiUrl,
        {
          model: 'mistral-small-latest',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(res.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error: Unable to fetch response. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      <header className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-800 dark:text-indigo-300">
            Navarasa Gita Wisdom
          </h1>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-300 dark:hover:bg-indigo-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-6 h-6" />
            ) : (
              <SunIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch">
            {/* Left Column: Emotion Cards and Question Form */}
            <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 sm:mb-6">
                {emotions.map((emotion) => (
                  <EmotionCard
                    key={emotion.name}
                    emotion={emotion}
                    isSelected={selectedEmotion?.name === emotion.name}
                    onSelect={handleEmotionSelect}
                  />
                ))}
              </div>
              <QuestionForm
                selectedEmotion={selectedEmotion}
                question={question}
                setQuestion={setQuestion}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>

            {/* Right Column: Response Display */}
            <div className="w-full md:w-2/5">
              {loading && (
                <div className="bg-indigo-50 dark:bg-indigo-950 p-4 sm:p-6 rounded-lg shadow-md animate-pulse">
                  <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded w-full mb-4"></div>
                  <div className="h-4 bg-indigo-200 dark:bg-indigo-800 rounded w-5/6"></div>
                </div>
              )}
              {response && !loading && <ResponseDisplay response={response} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;