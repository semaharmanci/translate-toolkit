import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "883873c3f6msh66369b1d8262fa3p168b07jsn5a287a73e2ae",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});
