import dotenv from 'dotenv';

dotenv.config()

export default (process.env.TOKEN || require("../token").token) as string