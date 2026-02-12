const { Kafka } = require('kafkajs')

exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['<private_ip>:9092']
})