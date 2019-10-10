// packages/reminder-bot-receiver/lib/db.js

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: process.env.GCP_PROJECT,
  timestampsInSnapshots: true
})

const persistReminder = async (spaceName, threadName, userInput, reminderDate, reminderSubject, userName) => {
  try {
    await db.collection('reminders').add({
      parent: spaceName,
      raw_msg: userInput,
      remind_at: reminderDate,
      status: 'new',
      subject: reminderSubject,
      thread: threadName,
      user: userName,
    })
  } catch (error) {
    console.error(new Error(`Reminder could not be persisted due to: ${error}`))
  }
}

module.exports = {
  persistReminder
}
