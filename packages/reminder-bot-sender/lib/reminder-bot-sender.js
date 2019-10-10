const { sendResponse } = require('./hangouts-chat-api')

exports.reminderBotSender = async (event, context) => {
  console.log(`Input received:
    Event: ${JSON.stringify(event)}
    Context: ${JSON.stringify(context)}`)

  const chatResponse = JSON.parse(Buffer.from(event.data, 'base64').toString())
  console.log('Chat response body:', chatResponse)
  await sendResponse(chatResponse)
}
