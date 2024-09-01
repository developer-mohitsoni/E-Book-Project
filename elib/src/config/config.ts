import "dotenv/config";

const _config = {
    port: process.env.PORT,
    databaseURL: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
};
// Make config readonly that's why use Object.freeze
export const config = Object.freeze(_config);
