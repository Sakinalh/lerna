export const queryParamFormater = (params: {[key: string]: any}) => Object.keys(params)
  .map((k: string) => k + "=" + encodeURIComponent(params[k]))
  .join("&");

export const bodyParamsFormater = (params: {[key: string]: any}) => {
  const formData = new FormData();
  for(const i in params) {
    formData.set(i, params[i]);
  }
  return formData;
};

export const replacePathParameter = (path: string, params:{[key: string]: any}) => {
  const parts: string[] = path.split("/");

  for(const i in parts) {
    if(parts[i][0] === ":") {
      const paramName: string = parts[i].substring(1);
      if(paramName in params) {
        path = path.replace(parts[i], encodeURIComponent(params[paramName]));
      } else {
        // eslint-disable-next-line
          console.error('The parameter ' + paramName + ' was not provided');
      }
    }
  }

  return path;
};

export const formatFilters = () => {

};