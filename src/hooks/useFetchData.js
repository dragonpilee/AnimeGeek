import axios from "axios";
import { useEffect, useState } from "react";
import { TMDB_BASE_URL, TMDB_TOKEN } from "../constants";

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

    // If path starts with /, it's a relative path to TMDB or local API
    // If it starts with http, it's an absolute URL
    const url = path.startsWith("http") ? path : `${TMDB_BASE_URL}${path}`;

    const headers = {};
    if (url.includes("themoviedb.org")) {
      headers["Authorization"] = `Bearer ${TMDB_TOKEN}`;
      headers["Content-Type"] = "application/json";
    }

    axios
      .get(url, { headers })
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
