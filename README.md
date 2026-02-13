Navarasa Gita Wisdom
A React application that allows users to select an emotion, ask a question, and receive a relevant Bhagavad Gita shloka with its meaning and advice, powered by the Mistral AI API. Features include dark/light mode, text-to-speech, fixed height with scrollable content, and mobile responsiveness.
Features

Emotion Selection: Choose from nine Navarasa emotions (e.g., Shringara, Bhayanaka).
Question Input: Submit a question related to the selected emotion.
API Integration: Fetches a Bhagavad Gita shloka, meaning, and advice via Mistral AI API.
Text-to-Speech: Read the response aloud using a natural female voice, with play/stop toggle.
Dark/Light Mode: Toggle between themes, persisted in localStorage.
Responsive Design: Two-column layout on desktop, single-column on mobile.
Fixed Height: Content is scrollable within a 100vh viewport, with a sticky header.

Prerequisites

Node.js (v16 or higher)
npm or yarn
Mistral AI API key (obtain from Mistral AI)

Setup

Clone the Repository:
git clone <repository-url>
cd navarasa-gita-wisdom


Install Dependencies:
npm install

Dependencies:

axios
@heroicons/react
@tailwindcss/typography


Configure Environment:

Create a .env file in the root:VITE_MISTRAL_API_KEY=your_mistral_api_key_here


Replace your_mistral_api_key_here with your Mistral AI API key.


Configure Tailwind CSS:

Ensure tailwind.config.js is set up:module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
};


Update src/index.css:@tailwind base;
@tailwind components;
@tailwind utilities;




Run the Application:
npm run dev

Open http://localhost:5173 in your browser.


Project Structure
src/
├── components/
│   ├── EmotionCard.jsx
│   ├── QuestionForm.jsx
│   ├── ResponseDisplay.jsx
├── constants/
│   ├── emotions.js
├── App.jsx
├── index.css


App.jsx: Main component with layout, theme toggle, and API integration.
ResponseDisplay.jsx: Displays the API response with text-to-speech.
EmotionCard.jsx: Renders individual emotion cards.
QuestionForm.jsx: Handles question input and submission.
emotions.js: Defines the Navarasa emotions array.

Usage

Select an Emotion:
Click on an emotion card (e.g., Shringara, Bhayanaka).


Enter a Question:
Type a question related to the emotion in the textarea.


Submit:
Click the "Submit" button to fetch a response from the Mistral AI API.


View Response:
The response (shloka, chapter/verse, meaning, advice) appears in the right column (desktop) or below (mobile).


Text-to-Speech:
Click the speaker icon in the response card to read the response aloud.
Click again to stop.


Toggle Theme:
Click the sun/moon icon in the header to switch between light and dark modes.



Mobile Responsiveness

Layout: Stacks vertically on mobile (<768px), with two columns on desktop (≥768px).
Touch-Friendly: Larger buttons (p-3), font sizes (text-base to text-lg), and padding (p-4).
Spacing: Adjusted p-4/gap-4 on mobile, p-6/gap-6 on desktop.

Troubleshooting

Text-to-Speech Not Working:
Ensure you're using a supported browser (Chrome, Edge, Safari).
Check console for voice loading errors (console.log(voices) in ResponseDisplay.jsx).
Verify onvoiceschanged is firing (may require user interaction).


Theme Toggle Not Working:
Confirm darkMode: 'class' in tailwind.config.js.
Check <html> for the dark class in dev tools.


API Errors:
Ensure the Mistral API key is valid in .env.
Check network requests in dev tools for 401/403 errors.


Layout Issues:
Verify md:flex-row and items-stretch are applied.
Adjust p-4/p-6 or gap-4/gap-6 if spacing feels off.



Future Enhancements

Add voice selection dropdown for text-to-speech.
Sanitize API response with DOMPurify for security.
Implement error handling for API failures with user feedback.
Add animations for card selection and theme transitions.

License
MIT License
# Navarasa-Gita
