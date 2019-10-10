// packages/reminder-bot-receiver/lib/pubsub.js
const { PubSub } = require('@google-cloud/pubsub')

const pubsub = new PubSub()

const sendMessage = async (message) => {
  try {
    const messageId = await pubsub
      .topic('reminder-bot-messages-out')
      .publisher()
      .publish(Buffer.from(JSON.stringify(message)));
    console.log(`Message ${messageId} published.`);
  } catch (error) {
    console.error(new Error(`Message could not be published due to: ${error}`))
  }
}

module.exports = {
  sendMessage
}
