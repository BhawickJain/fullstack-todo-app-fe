import Todo from "../types/Todo";
import getAllItems from "./getAllItems";
import sortByID from "./sortbyID";

const pullLatestState = (setTodoList: (todoList: Todo[]) => void): void => {
  getAllItems().then((allTodos) => {
    setTodoList(sortByID(allTodos));
  });
  console.log("data loaded");
};

export default pullLatestState;
