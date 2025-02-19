import { config } from "dotenv";

config({path:`.env.${process.env.NOD_ENV ||'development'}.local`});

const PORT=process.env.PORT;

export {PORT};