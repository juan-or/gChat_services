const { findReminders, setReminderStatusSent } = require('./db')
const { sendMessage } = require('./pubsub')

exports.reminderBotChecker = async (event, context) => {
  console.log(`Input received:
    Event: ${JSON.stringify(event)}
    Context: ${JSON.stringify(context)}`)
  const schedulerBody = JSON.parse(Buffer.from(event.data, 'base64').toString())
  console.log('Scheduler body:', schedulerBody) // Empty object

  const reminders = await findReminders()
  console.log(`Found ${reminders.length} reminders to be sent.`)

  let reminderIndex = 1
  for (const reminderDoc of reminders) {
    const reminder = reminderDoc.data()
    const reminderId = reminderDoc.id
    console.log(`Processing reminder with ID ${reminderId} (${reminderIndex} of ${reminders.length})`)

    await sendMessage({
      spaceName: reminder.parent,
      threadName: reminder.thread,
      message: `Your reminder: ${reminder.subject}`
    })
    setReminderStatusSent(reminderId)
    reminderIndex++
  }
} 
