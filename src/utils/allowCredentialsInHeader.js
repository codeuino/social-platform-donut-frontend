import axios from "axios";

export const allowCredentialsInHeader = () => {
  axios.defaults.withCredentials = true;
}
