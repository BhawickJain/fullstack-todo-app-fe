import Todo from "../types/Todo";

const sortByID = (TodoList: Todo[]): Todo[] => {
  const sortedTodoList: Todo[] = TodoList.sort((a, b) => a.id - b.id);
  return sortedTodoList;
};

export default sortByID;
