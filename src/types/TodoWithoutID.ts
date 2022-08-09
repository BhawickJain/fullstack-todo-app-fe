export default interface TodoWithoutID {
  //   id: number;
  creationDate: string;
  status: "done" | "in-progress";
  task: string;
}
