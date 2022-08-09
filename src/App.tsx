import React, { useEffect, useState } from "react";
import mockTodoList from "./data/mockTodo";
import Todo from "./types/Todo";
import sortByID from "./utils/sortbyID";
import axios from "axios";

const basePath = "https://api-todo-bhawick.herokuapp.com";

function App(): JSX.Element {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");
  useEffect(() => {
    axios.get(`${basePath}/items`).then((res) => console.log(res));
    setTodoList(sortByID(mockTodoList));
  }, []);

  const handleClickDone = (id: string): void => {
    console.log(`${id} done`);
    let todo: Todo = todoList.filter((todo) => todo.id.toString() === id)[0];
    const newTodoList: Todo[] = todoList.filter(
      (todo) => todo.id.toString() !== id
    );
    todo = {
      ...todo,
      status: "done",
    };
    setTodoList(sortByID([...newTodoList, todo]));
  };

  const handleClickDelete = (id: string): void => {
    console.log(`${id} delete`);
    const newTodoList: Todo[] = todoList.filter(
      (todo) => todo.id.toString() !== id
    );
    setTodoList(sortByID([...newTodoList]));
  };

  const handleChangeNewTask = (newInput: string): void => {
    console.log(`current state of input: ${newInput}`);
    setTodoInput(newInput);
  };

  const handleTaskSubmit = (): void => {
    if (todoInput !== "") {
      console.log(`current state of input: ${todoInput}`);
      const newTodo: Todo = {
        id: todoList.length,
        creationDate: "2022-08-09T08:43:00Z",
        status: "in-progress",
        task: todoInput,
      };

      setTodoList([...todoList, newTodo]);
      setTodoInput("");
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
            onChange={(e) => handleChangeNewTask(e.target.value)}
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
                    onClick={() => handleClickDone(todo.id.toString())}
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
