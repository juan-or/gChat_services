const { google } = require('googleapis')
const chat = google.chat({
  version: 'v1'
})
const sendResponse = async (chatResponse) => {
  console.log('Obtaining auth client for the Hangouts Chat API.')
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/chat.bot']
  });
console.log('Sending message to the Hangouts Chat API.')
  const payload = {
    parent: chatResponse.spaceName,
    requestBody: {
      text: chatResponse.message
    },
    auth
  }
// Most messages are meant for a specific thread
  if (chatResponse.threadName) {
    payload.requestBody.thread = {
      name: chatResponse.threadName
    }
  }
try {
    await chat.spaces.messages.create(payload)
    console.log('Message successfully sent to the Hangouts Chat API.')
  } catch (error) {
    console.error(new Error(`Message could not be sent to the Hangouts Chat API due to: ${error}`))
  }
}
module.exports = {
  sendResponse
}
