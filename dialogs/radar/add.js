var builder = require('botbuilder');

module.exports = [ // Destination
  function(session) {
    builder.Prompts.text(session, 'Cool what do you want to add?');
  },
  function(session, results, next) {
    session.dialogData.destination = results.response;
    session.send('What sort of thing is %s?', results.response);
    next();
  }

]
