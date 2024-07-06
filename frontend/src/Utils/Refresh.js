import axios from "axios";
const url = import.meta.env.VITE_HOST_BACKEND;

async function RefreshToken() {
  const result = await axios({
    method: "get",
    url: `${url}/api/token`,
    withCredentials: true,
  });

  // console.log("sd");
  return await result.data;
}

export default RefreshToken;
