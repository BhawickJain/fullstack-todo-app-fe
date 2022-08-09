import Status from "./Status";

export default interface Todo {
  id: number;
  creationDate: string;
  status: Status;
  task: string;
}
