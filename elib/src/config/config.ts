import "dotenv/config";

const _config = {
    port: process.env.PORT,
};
// Make config readonly that's why use Object.freeze
export const config = Object.freeze(_config);
