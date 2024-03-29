import { useEffect, useState } from "react";
import UserSelect from "./UserSelect";
import { useTodos } from "../hooks/useTodos";
import TodoList from "./TodoList";

const Todos = () => {
  const [user, setUser] = useState();
  const [tab, setTab] = useState("all");
  const { error, fetchTodosUser, loading, todos, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodosUser();
  }, []);

  useEffect(() => {
    if (todos?.length) {
      if (user === "all") {
        fetchTodos();
      } else {
        fetchTodosUser(user);
      }
    }
  }, [user]);

  if (error) {
    return <div data-testid="error">Error occured</div>;
  }

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  return (
    <>
      <h1>Active User: {user || 1}</h1>
      <UserSelect val={user} onChange={(e) => setUser(e.target.value)} />

      <div className="btn-group">
        <button
          className={tab === "all" ? "active" : ""}
          onClick={() => setTab("all")}
        >
          All
        </button>
        <button
          className={tab === "active" ? "active" : ""}
          onClick={() => setTab("active")}
        >
          Active
        </button>
        <button
          className={tab === "completed" ? "active" : ""}
          onClick={() => setTab("completed")}
        >
          Completed
        </button>
      </div>

      <TodoList todos={todos} activeTab={tab} />
    </>
  );
};

export default Todos;
