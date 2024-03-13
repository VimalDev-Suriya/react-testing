const TodoItem = (props) => {
  const { title, completed } = props ?? {};

  if (!title) {
    return null;
  }

  return <li className={`${completed ? "green" : "red"}`}>{title}</li>;
};

export default TodoItem;
