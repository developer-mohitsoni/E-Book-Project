import app from "./app";
import { config } from "./config/config";
import connectDB from "./config/db";

const startServer = () => {
    // Connect Database
    connectDB();
    const PORT = config.port || 5513;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
