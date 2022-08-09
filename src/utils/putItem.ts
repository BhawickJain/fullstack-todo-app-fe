import axios, { AxiosResponse } from "axios";
import basePath from "../constants/backendBasePath";
import TodoWithoutID from "../types/TodoWithoutID";

const putItem = async (todo: TodoWithoutID): Promise<AxiosResponse> => {
  const status = await axios.post(`${basePath}/items`, todo);
  return status;
};

export default putItem;
