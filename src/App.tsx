import { useEffect, useState } from "react";
import Todo from "./types/Todo";
import sortByID from "./utils/sortbyID";
import putItem from "./utils/putItem";
import TodoWithoutID from "./types/TodoWithoutID";
import deleteItem from "./utils/deleteItem";
import toggleStatus from "./utils/toggleStatus";
import patchItem from "./utils/patchItem";
import pullLatestState from "./utils/pullLatestState";

function App(): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");

  // initialisation
  useEffect(() => {
    pullLatestState(setTodoList);
    console.log("data loaded");
  }, []);

  const handleClickStatus = (id: string): void => {
    console.log(`${id} status`);
    const todoFound: Todo = todoList.filter(
      (todo) => todo.id.toString() === id
    )[0];
    const newTodoList: Todo[] = todoList.filter(
      (todo) => todo.id.toString() !== id
    );
    console.log(todoFound, "found for Patch");

    const todoUpdated: Todo = {
      id: todoFound.id,
      creationDate: todoFound.creationDate,
      task: todoFound.task,
      status: toggleStatus(todoFound.status),
    };
    console.log(todoUpdated, "to be patched with");
    patchItem(todoUpdated).then((res) => console.log(res.status));
    setTodoList(sortByID([...newTodoList, todoUpdated]));
    pullLatestState(setTodoList);
  };

  const handleClickDelete = (id: string): void => {
    console.log(`${id} delete`);
    const newTodoList: Todo[] = todoList.filter(
      (todo) => todo.id.toString() !== id
    );
    deleteItem(id).then((status) => {
      console.log(status);
    });
    setTodoList(newTodoList);
    pullLatestState(setTodoList);
  };

  const handleChangeInputTask = (newInput: string): void => {
    setTodoInput(newInput);
  };

  const handleTaskSubmit = (): void => {
    if (todoInput !== "") {
      const newTodo: TodoWithoutID = {
        creationDate: "2022-08-15:43:00Z",
        status: "in-progress",
        task: todoInput,
      };

      putItem(newTodo).then((res) => {
        console.log(res);
        setTodoList([...todoList, res.data]);
        setTodoInput("");
      });
      pullLatestState(setTodoList);
    }
  };

  return (
    <>
      <header>
        <h1>Todo App</h1>
      </header>
      <main>
        <div>
          <input
            type="text"
            onChange={(e) => handleChangeInputTask(e.target.value)}
            value={todoInput}
          />
          <button className="submit" onClick={() => handleTaskSubmit()}>
            Submit
          </button>
        </div>
        <div className="display">
          <ol>
            {todoList.map((todo) => {
              return (
                <li key={todo.id}>
                  <button
                    className="status"
                    id={todo.id.toString()}
                    onClick={() => handleClickStatus(todo.id.toString())}
                  >
                    [{todo.status}]
                  </button>
                  <button
                    className="delete"
                    id={todo.id.toString()}
                    onClick={() => handleClickDelete(todo.id.toString())}
                  >
                    [delete]
                  </button>
                  <span>{todo.task}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </main>
    </>
  );
}

export default App;
