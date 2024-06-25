import axios from "axios";

const url = import.meta.env.VITE_HOST_BACKEND;

function RefreshToken() {
  axios({
    method: "get",
    url: `${url}api/token`,
    withCredentials: true,
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export default RefreshToken;
