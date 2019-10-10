const EVENT_HANDLERS = require('./event-handlers')
const RESPONSE_HANDLERS = require('./response-handlers')

exports.reminderBotReceiver = async (event, context) => {
  console.log(`Input received:
    Event: ${JSON.stringify(event)}
    Context: ${JSON.stringify(context)}`)

// See https://developers.google.com/hangouts/chat/reference/message-formats/events#event_fields
  const chatEventBody = JSON.parse(Buffer.from(event.data, 'base64').toString())
  console.log('Chat event body:', chatEventBody)

  try {
    await EVENT_HANDLERS[chatEventBody.type](chatEventBody)
  } catch (error) {
    console.error(new Error(`Couldn't process event due to: ${error}`))
  }

  try {
    await RESPONSE_HANDLERS[chatEventBody.type](chatEventBody)
  } catch (error) {
    console.error(new Error(`Couldn't process event due to: ${error}`))
  }
};

