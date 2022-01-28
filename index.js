const { QueueServiceClient } = require("@azure/storage-queue");

const queueServiceClient = QueueServiceClient.fromConnectionString(
    ''
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

receiveMessages()
