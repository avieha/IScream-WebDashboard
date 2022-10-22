const express = require("express");
const cors = require("cors");
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
require('dotenv').config({ path: require('find-config')('.env') })
const controller = require("./controller/StreamLayer.Controller");
const kafkaConsumer = require("./model/Kafka");
const db = require("./model/redis");
const { createSqlConnection } = require("../BatchLayer/model/mySql");

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

app
    .get("/", (req, res) => {
        res.send("Hello World!");
    })
    /* Routes */

    .put("/api/reduceInventory", controller.reduceInventory)
    .put("/api/addInventory", controller.addInventory)
    .get("/api/getBranchInventory", controller.getBranchInventory)
    .get("/api/getAllInventory", controller.getAllInventory);

// io.on("connection", async (client) => {
//     console.log("Client connected to socket");
//     try {
//         let calls_data = await db.redis.json.GET("calls_data");
//         io.emit("calls", calls_data);
//         console.log("calls data:", calls_data);
//     } catch (error) {
//         console.log(error);
//     }
// });

kafkaConsumer.on("data", async (message) => {
    console.log("got data");
    const buffer = Buffer.from(message.value);
    const bufferObject = JSON.parse(buffer.toString());

    let { cityName, taste, quantity } = bufferObject;
    try {
        await controller.reduceInventory(cityName,taste,quantity);
        //   io.emit("calls", calls_data);
        //   io.emit("last_call", new_Call);
    } catch (error) {
        console.log(error);
    }
});

/* Start server */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
    console.log(`StreamLayer listening at http://localhost:${PORT}`)
);

createSqlConnection();
db.createRedisConnection();
