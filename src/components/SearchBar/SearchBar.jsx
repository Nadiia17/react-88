export const SearchBar = ({
  filters: { topic, level },
  // onChangeTopic,
  // onChangeLevel,
  onchangeFilter,
}) => {
  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={evt => onchangeFilter('topic', evt.target.value)}
        placeholder=" Filter by topic"
      />
      <select
        value={level}
        onChange={evt => onchangeFilter('level', evt.target.value)}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};
