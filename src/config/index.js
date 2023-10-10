const API_BASE_PATH = import.meta.env.VITE_API_URL;
const HOME_NAME = import.meta.env.VITE_HOME_NAME;


console.debug('environment', {
  API_BASE_PATH,
  HOME_NAME,
});

export {
  API_BASE_PATH,
  HOME_NAME,
};
