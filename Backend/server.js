const app = require("./app");
const dotenv = require('dotenv');

dotenv.config({ path: "backend/config/config.env" });

//Database connection
const connectDatabase = require('./config/databaseConnect');

connectDatabase();

app.listen(
    process.env.PORT,
    () => { console.log(`Server running on port http://localhost:${process.env.PORT}`) }
)