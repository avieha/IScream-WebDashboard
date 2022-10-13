const Redis = require("redis");
require("dotenv").config();

const redis = Redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

redis
    .on("connect", function () {
        console.log("Reciever connected to Redis at: " + process.env.REDIS_URL);
    })
    .on("error", function (err) {
        console.log("Error " + err);
    });

(async () => {
    await redis.connect();
})();

module.exports.redis = redis;