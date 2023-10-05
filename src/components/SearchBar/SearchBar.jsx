export const SearchBar = () => {
  return (
    <div>
      <input type="text" placeholder=" Filter by topic" />
      <select name="">
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermidiate">Intermidiate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>
  );
};
