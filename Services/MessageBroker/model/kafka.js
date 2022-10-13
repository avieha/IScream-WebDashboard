const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const kafkaConf = require("../../config/kafka.config");
require("dotenv").config();


const topic = process.env.KAFKA_TOPIC;
const producer = new Kafka.Producer(kafkaConf);

producer
    .on("ready", (arg) =>
        console.log(`producer ${arg.name} ready. topic: ${topic}`)
    )
    .on("event", (err) => console.log(err))
    .connect();

const publishMessage = async (purchase) => {            
    const m = Buffer.from(JSON.stringify(purchase));
    producer.produce(topic, null, m, uuid.v4());
};

module.exports = {
    publishMessage,
};