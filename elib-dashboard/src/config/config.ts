const _config = {
  serverURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5513",
};
// Make config readonly that's why use Object.freeze
export const config = Object.freeze(_config);
