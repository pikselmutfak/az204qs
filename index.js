const { QueueServiceClient } = require("@azure/storage-queue");

const queueServiceClient = QueueServiceClient.fromConnectionString(
    'DefaultEndpointsProtocol=https;AccountName=storageke;AccountKey=PFGwLgl+3214CFk8CigRz/wLdCs37VyoupaJQPHQb+hifpN2vcrQX2428VPpj9olSTM/78Gj/s4wXjUmvV7UJw==;EndpointSuffix=core.windows.net'
);

const receiveMessages = async () => {
    const queueClient = queueServiceClient.getQueueClient("orders");
    const response = await queueClient.receiveMessages() // mesaj okur ve siler
    // const responsep = await queueClient.peekMessages() // mesaj okur ama silmez
    console.log(response.receivedMessageItems)

    response.receivedMessageItems.forEach(async (message) => {
        await queueClient.deleteMessage(message.messageId, message.popReceipt);
    })
}

setInterval(() => {
    receiveMessages()
}, 2000)
