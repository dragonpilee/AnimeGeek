import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API } from "../constants";

const useFetchData = (path) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: "",
  });

  const refetch = () => {
    setState((prev) => ({
      ...prev,
      error: "",
    }));
    getData();
  };

  const getData = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get(`${BASE_API}${path}`)
      ?.then(({ data }) => {
        if (data) {
          setState((prev) => ({
            ...prev,
            data,
          }));
        }
      })
      ?.catch((e) => {
        setState((prev) => ({
          ...prev,
          error: e?.message,
        }));
      })
      ?.finally(() => {
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  const clearState = () => {
    setState((prev) => ({
      ...prev,
      data: [],
      error: "",
      loading: false,
    }));
  };

  useEffect(() => {
    getData();

    return () => {
      clearState();
    };
  }, [path]);

  return { ...state, refetch };
};
export default useFetchData;
