const { sendMessage } = require('../pubsub')
const helpMessage = `Hey! I can remind you of stuff. Tell me what to remember and when to remind you and I will send you a direct message at the right time. For example, "@Reminder Bot buy milk tomorrow at 6pm".`
module.exports = async (chatEventBody) => {
  console.log('Processing response for event type ADDED_TO_SPACE')
await sendMessage({
    spaceName: chatEventBody.space.name,
    message: `Thanks for adding me, ${chatEventBody.user.displayName}. ${helpMessage}`
  })
}
