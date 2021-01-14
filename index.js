const { QueueServiceClient } = require("@azure/storage-queue");

const queueServiceClient = QueueServiceClient.fromConnectionString(
    'DefaultEndpointsProtocol=https;AccountName=pixke;AccountKey=zzXrTlnSaVOwBdrYkxU5/wPtvOxmqzw6luV04b+NN88RKBL2XcszpWJtudVjhpqT0Fq278BsWtWcDPnv9W7daQ==;EndpointSuffix=core.windows.net'
);

const receiveMessages = async () => {
    const queueClient = queueServiceClient.getQueueClient("siparisler");
    const response = await queueClient.receiveMessages()
    console.log(response.receivedMessageItems)

    response.receivedMessageItems.forEach(async (message) => {
        await queueClient.deleteMessage(message.messageId, message.popReceipt);
    })
}

receiveMessages()
