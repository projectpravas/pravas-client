//create axios instance
import axios from "axios";
import endpoints from "./endpoints";
const API = axios.create({
  baseURL: `${endpoints.serverBaseURL}/api/v1`,
});
export default API;
