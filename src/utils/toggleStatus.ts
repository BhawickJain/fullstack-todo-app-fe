import Status from "../types/Status";

const toggleStatus = (status: Status): Status => {
  if (status === "in-progress") {
    return "done";
  } else {
    return "in-progress";
  }
};

export default toggleStatus;
