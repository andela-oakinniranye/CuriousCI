require('dotenv').config()
const { getHandler } = require('./utils/eventSource.js')


exports.handler = (event, context, callback) => {
  const { handler } = getHandler(event)

  if ( !handler ) context.fail()

  handler(event, context, callback)
};
