const API_BASE_PATH = import.meta.env.VITE_API_URL;
const HOME_NAME = import.meta.env.VITE_HOME_NAME;
const BUILD_INFO = import.meta.env.VITE_BUILD_INFO;

console.debug('environment', {
  API_BASE_PATH,
  HOME_NAME,
  BUILD_INFO,
});

export {
  API_BASE_PATH,
  HOME_NAME,
  BUILD_INFO,
};
