import axios from "axios";
import basePath from "../constants/backendBasePath";
import Todo from "../types/Todo";

const getAllItems = async (): Promise<Todo[]> => {
  const fetchedItems = await (await axios.get(`${basePath}/items`)).data;
  const allItems: Todo[] = fetchedItems;
  return allItems;
};

export default getAllItems;
