const {kafka} = require('./kafka')

const init = async () => {
    const admin = kafka.admin()
    console.log('Connecting admin...')
    await admin.connect()
    console.log('Admin connected Success...')
    await admin.createTopics({
        topics: [
            {   topic: 'rider-updates', numPartitions: 2 }
        ]
    })
    console.log("Disconnecting Admin..");
    await admin.disconnect();
}
init()