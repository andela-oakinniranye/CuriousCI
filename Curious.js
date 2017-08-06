require('dotenv').config();
const { getHandler } = require('./utils/eventSource.js');
const { handlerNotRegisteredError } = require('./utils/errors.js');


exports.handler = (event, context, callback) => {
  const { handler } = getHandler(event);

  if ( !handler ) {
    context.fail(JSON.stringify(handlerNotRegisteredError)); //ultimately we want to callback({statusCode: 401}, null)
  } else {
    handler(event, context, callback);
  }

};
