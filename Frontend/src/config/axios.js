import axios from "axios";
const clienteaxios = axios.create({
  baseURL: "http://localhost:3001/api/",
});
export default clienteaxios;
