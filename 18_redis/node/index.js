import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("error", (error) => {
    console.log("Error: ", error)
});

redisClient.on("connect", () => console.log("Connected to redis...."));

await redisClient.connect();

redisClient.set("myKey", "some value");

const value = await redisClient.get("myKey");

console.log(value);