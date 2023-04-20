import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://api.up2tom.com/v3";
axios.defaults.headers.common[
  "Authorization"
] = `Token ${process.env.REACT_APP_TOKEN}`;

const useFetch = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/models");
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { response, error, loading };
};

export default useFetch;
