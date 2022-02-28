function formatHostName(hostname = window.location.hostname) {
  return !hostname.endsWith("/") ? hostname + "/" : hostname;
}

export const getEnvVariables = () => ({
  NODE_ENV: "production",
  PUBLIC_URL: formatHostName(),
  REACT_APP_API_URI: formatHostName(),
  REACT_APP_NAISTER_API_URI: formatHostName()
});