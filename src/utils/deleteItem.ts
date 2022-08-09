import axios from "axios";
import basePath from "../constants/backendBasePath";

const deleteItem = async (id: string): Promise<number> => {
  const status = await (await axios.delete(`${basePath}/items/${id}`)).status;
  return status;
};

export default deleteItem;
