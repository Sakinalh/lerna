import { useState, useEffect } from "react";
import axios from "axios";
import { useCognitoToken } from "src/PageLogin/hooks/useCognitoToken";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [token, setToken] = useState(null);
  (async () => {
    const token = await useCognitoToken();
    setToken(token);
  })();
  axios.defaults.headers = {Authorization: "Bearer "+token};
  console.log("token ");

  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return response;
};

export default useAxios;