const QuestionForm = ({ selectedEmotion, question, setQuestion, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          Selected Emotion: {selectedEmotion ? selectedEmotion.name : 'None'}
        </label>
      </div>
      <div>
        <label htmlFor="question" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
          Your Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 text-base sm:text-lg"
          rows="4"
          placeholder="Enter your question here..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 sm:py-3 px-4 rounded-md text-base sm:text-lg text-white ${
          loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default QuestionForm;