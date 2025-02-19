import { config } from "dotenv";

config({path:`.env.${process.env.NOD_ENV ||'development'}.local`});

const PORT=process.env.PORT;

const DB_URL = process.env.DB_URL;

export {PORT,DB_URL};