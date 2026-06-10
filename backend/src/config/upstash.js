import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config()
const hasUpstashEnv =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

let ratelimit = null;

if (hasUpstashEnv) {
    //Create a rate limiter that allows 10 req per 20 sec
    ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "20 s"),
    });
}

export default ratelimit;