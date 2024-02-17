import axios from "axios";
const instance = axios.create({
  baseURL: "https://react-my-burger-daebc-default-rtdb.firebaseio.com/",
});
export default instance;
