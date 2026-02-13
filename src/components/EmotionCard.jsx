const EmotionCard = ({ emotion, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 rounded-lg shadow cursor-pointer transition-colors ${
        isSelected
          ? 'bg-indigo-600 text-white'
          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-900'
      }`}
      onClick={() => onSelect(emotion)}
    >
      <h3 className="text-base sm:text-lg font-semibold">{emotion.name}</h3>
      <p className="text-sm sm:text-base mt-1">{emotion.description || 'Select this emotion'}</p>
    </div>
  );
};

export default EmotionCard;