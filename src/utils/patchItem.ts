import axios, { AxiosResponse } from "axios";
import basePath from "../constants/backendBasePath";
import Todo from "../types/Todo";

const patchItem = async (todo: Todo): Promise<AxiosResponse> => {
  const status = await axios.patch(`${basePath}/items/${todo.id}`, todo);
  return status;
};

export default patchItem;
