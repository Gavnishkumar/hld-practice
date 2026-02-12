const {kafka} = require('./kafka').kafka

const kafka = new Kafka({
  clientId: 'my-app-consumer',
  brokers: ['<private_ip>:9092']
})

const init = async () => {
    const consumer = kafka.consumer({ groupId: 'group-1' })
    console.log('Connecting consumer...')
    await consumer.connect()
    console.log('Consumer connected Success...')
    await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Received message:', message.value.toString())
        }
    })
}
init()