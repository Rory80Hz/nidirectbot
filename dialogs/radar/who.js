var builder = require('botbuilder');

module.exports = [ // Destination
  function(session) {
    builder.Prompts.text(session, 'Are you thinking people or projects?');
  },
  function(session, results, next) {
    session.dialogData.destination = results.response;
    session.send('%s who use the thing?', results.response);
    next();
  }

]
