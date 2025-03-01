import Redis from "ioredis";
import { configDotenv } from 'dotenv';
configDotenv();

const redisuri = process.env.REDIS_URI;
const redis = new Redis(redisuri);

export default redis;