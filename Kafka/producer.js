const kafka = require('./kafka').kafka

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = async () => {
    const producer = kafka.producer()
    console.log('Connecting producer...')
    await producer.connect()
    console.log('Producer connected Success...')
    rl.setPrompt("> ")
    rl.prompt()
    rl.on("line", async (input) => {
        const [message,loc] = input.split(" ");
        await producer.send({
        topic: 'rider-updates',
        messages: [
            {
                partition: loc.toLowerCase() === "north" ? 0 : 1,
                key: 'msg',
                value: message
            },
        ]
    })
}).on("close", async () => {
    console.log("Disconnecting producer..");
    await producer.disconnect();
})
}
init()