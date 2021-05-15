import { useMemo, useReducer } from "react";

const initialState = {
  status: null,
  response: null,
  error: null,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST":
      return { ...state, status: "loading", response: null, error: null };

    case "SUCCESS":
      return {
        ...state,
        status: "success",
        response: action.payload,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        status: "error",
        error: action.payload,
        response: null,
      };

    default:
      return state;
  }
};

export function useService(service) {
  const [state, dispatch] = useReducer(httpReducer, initialState);

  const serviceMethods = useMemo(() => {
    const wrapFetcher = (fetcher) => {
      return (...args) => {
        dispatch({ type: "REQUEST" });
        return Promise.resolve(fetcher(...args))
          .then((response) => {
            dispatch({ type: "SUCCESS", payload: response });
            return response;
          })
          .catch((error) => {
            dispatch({ type: "ERROR", payload: error });
            throw error;
          });
      };
    };

    return Object.entries(service)
      .filter(([, serviceProp]) => typeof serviceProp === "function")
      .reduce(
        (prev, [name]) => ({
          ...prev,
          [name]: wrapFetcher(service[name].bind(service)),
        }),
        {}
      );
  }, [service]);

  return {
    ...state,
    ...serviceMethods,
    data: state.response?.data,
    isLoading: state.status === "loading",
    hasError: state.status === "error",
    wasSuccessful: state.status === "success",
  };
}
