import { act, render, screen } from "@testing-library/react";
import Todos from "./Todos";
import userEvent from "@testing-library/user-event";

let mockError, mockLoading, mockTodos;
const mockFetchTodos = jest.fn();
const mockfetchTodoUser = jest.fn();

jest.mock("../hooks/useTodos", () => ({
  useTodos: () => ({
    error: mockError,
    loading: mockLoading,
    todos: mockTodos,
    fetchTodos: mockFetchTodos,
    fetchTodosUser: mockfetchTodoUser,
  }),
}));

jest.mock("./UserSelect", () => ({
  __esModule: true,
  default: (props) => <div {...props} data-testid="user-select" />,
}));

jest.mock("./TodoList", () => ({
  __esModule: true,
  default: (props) => <div {...props} data-testid="todo-list" />,
}));

describe("<Todos>", () => {
  let instance;

  beforeEach(() => {
    instance = render(<Todos />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the componet", () => {
    expect(instance).toBeDefined();
  });

  it("shoudl fetch the todos", () => {
    expect(mockfetchTodoUser).toHaveBeenCalled();
  });

  it("should render user select", () => {
    const userSelct = screen.queryByTestId("user-select");

    expect(userSelct).toBeDefined();
  });

  describe("when fetch todos returns error", () => {
    beforeEach(() => {
      mockError = "some-error";
      instance.rerender(<Todos />);
    });

    it("should render the error", () => {
      expect(screen.queryByTestId("error")).toBeDefined();
    });
  });

  describe.each`
    buttonTitle    | activeTab
    ${"All"}       | ${"all"}
    ${"Completed"} | ${"completed"}
    ${"Active"}    | ${"active"}
  `("when user selects the $buttonTitle tab", ({ buttonTitle, activeTab }) => {
    beforeEach(() => {
      mockError = null;
      mockTodos = [];
      mockLoading = false;
      instance.rerender(<Todos />);
    });

    it("should set the active tab", async () => {
      const todolist = screen.queryByTestId("todo-list");
      const button = screen.getByRole("button", {
        name: buttonTitle,
      });

      await act(async () => {
        await userEvent.click(button);
      });

      expect(todolist).toHaveAttribute("activeTab", activeTab);
    });
  });
});
