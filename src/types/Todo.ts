export default interface Todo {
  id: number;
  creationDate: string;
  status: "done" | "in-progress";
  task: string;
}
