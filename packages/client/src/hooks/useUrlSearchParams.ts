import { useNavigate, useLocation } from "react-router";

export default function useUrlSearchParams() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const updateUrl = (parameterName, val, pathname?: string, replace: boolean = false) => {
    if(val === "undefined" || !val) {
      return;
    }

    if(searchParams.has(parameterName)) {
      searchParams.set(parameterName, val);
    } else {
      searchParams.append(parameterName, val);
    }

    const path = pathname || location.pathname;

    navigate(`${path}?${searchParams.toString()}`, { replace });
  };

  const routeTo = (path: string, replace = false) => {
    navigate(path, { replace });
  };

  const deleteQueryParam = (params: string[]) => {
    params.forEach(param => searchParams.delete(param));
  };

  const applyType = (value: string, type: string) => {
    switch (type) {
      case "number":
        return Number(value);
      default:
        return value;
    }
  };

  /**
   *
   * @param params it takes an array with all query params needed
   * @returns an array values of queryParams passed in params
   */
  const getQueryParams = (params: Object[]): Iterable<any> => params.map((obj: Object) => {
    let value: any = searchParams.get(Object.keys(obj)[0]);
    const type = Object.values(obj)[0];

    if(value) {
      value = applyType(value, type);
    }

    return value;
  });

  return {
    updateUrl, deleteQueryParam, getQueryParams, routeTo
  };
}
const formatType = (value: string, type: string) => {
  switch (type) {
    case "number":
      return Number(value);
    default:
      return value;
  }
};
export const getUrlParams = (params: Object[]): Iterable<any> => {
  const searchParams = new URLSearchParams(window.location.search);
  return params.map((obj: Object) => {
    let value: any = searchParams.get(Object.keys(obj)[0]);
    const type = Object.values(obj)[0];

    if(value) {
      value = formatType(value, type);
    }

    return value;
  });
};

export const updateUrl = (parameterName, val, pathname?: string, replace: boolean = false) => {
  const searchParams = new URLSearchParams(location.search);

  if(val === "undefined" || !val) {
    return;
  }

  if(searchParams.has(parameterName)) {
    searchParams.set(parameterName, val);
  } else {
    searchParams.append(parameterName, val);
  }

  const path = pathname || location.pathname;
  // eslint-disable-next-line
  console.log('NEW path  = ', `${path}?${searchParams.toString()}`);
  window.history.replaceState(null, null, `${path}?${searchParams.toString()}`);

  // window.location.pathname = (`${path}?${searchParams.toString()}`);
};
