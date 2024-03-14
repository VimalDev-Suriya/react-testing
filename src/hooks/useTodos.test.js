import { renderHook } from "@testing-library/react";
import { useTodos } from "./useTodos";
import { act } from "react-dom/test-utils";

const mockFetchTodos = jest.fn();
const mockFetchTodosWithUserId = jest.fn();

jest.mock("../services", () => ({
  TodoService: jest.fn().mockImplementation(() => ({
    fetchTodos: mockFetchTodos,
    fetchTodosWithUserId: mockFetchTodosWithUserId,
  })),
}));

describe("useTodos", () => {
  it("should fetch the todos", async () => {
    mockFetchTodos.mockResolvedValue({ data: "some-value" });
    const { result } = renderHook(() => useTodos());

    await act(async () => {
      await result.current.fetchTodos();
    });

    expect(result.current.todos).toEqual("some-value");
  });
});
