const addedToSpace = require('./added-to-space')
const message = require('./message')
const removedFromSpace = require('./removed-from-space')

// Keys represent event types.
// See https://developers.google.com/hangouts/chat/reference/message-formats/events#event_types
module.exports = {
    ADDED_TO_SPACE: addedToSpace,
    MESSAGE: message,
    REMOVED_FROM_SPACE: removedFromSpace
}
