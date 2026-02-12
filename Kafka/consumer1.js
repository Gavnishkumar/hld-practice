const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app-consumer1',     
  brokers: ['10.61.206.56:9092']
})

const init = async () => {
    const consumer = kafka.consumer({ groupId: 'group-1' })
    console.log('Consumer-1 (Group-1) Connecting...')
    await consumer.connect()
    console.log('Consumer-1 (Group-1) Connected Success...')
    await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString()
            })
        }
    })
}
init().catch(console.error)
