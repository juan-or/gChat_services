const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: process.env.GCP_PROJECT,
  timestampsInSnapshots: true
})

const findReminders = async () => {
  try {
    const remindersRef = db.collection('reminders');
    const queryRef = remindersRef
      .where('remind_at', '<=', new Date())
      .where('status', '==', 'new');
    const querySnapshot = await queryRef.get();
    return querySnapshot.docs;
  } catch (error) {
    console.error(new Error(`Reminders could not be found due to: ${error}`))
  }
}
const setReminderStatusSent = async (reminderId) => {
  await db.collection('reminders').doc(reminderId).update({ status: 'sent' })
}

module.exports = {
  findReminders
  setReminderStatusSent
} 
