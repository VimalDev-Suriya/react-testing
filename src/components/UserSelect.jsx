const UserSelect = (props) => {
  const { onChange, val } = props ?? {};

  return (
    <label className="mb1" data-testid="label">
      Select the User :
      <select
        name="user"
        onChange={onChange}
        value={val}
        data-testid="user-select"
      >
        <option value="1" data-testid="val1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="all">All</option>
      </select>
    </label>
  );
};

export default UserSelect;
