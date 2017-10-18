/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
  stateEndpoint: process.env.BotStateEndpoint,
  openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
 * Bot Storage: This is a great spot to register the private state storage for your bot.
 * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
 * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
 * ---------------------------------------------------------------------------------------- */

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

var bot = new builder.UniversalBot(connector, function(session) {
  session.send(
    'No idea what you are talking about. \'%s \'%s\'. Type \'help\' if you need assistance.',
    session.message.text);
});

var recognizer = new builder.LuisRecognizer(
  'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/f3e8edb3-ec43-44d8-a785-a45c73af2051?subscription-key=e393b8c6e2eb4d7fbbf35ceaebea495c&timezoneOffset=0&verbose=true&q='
);
bot.recognizer(recognizer);

bot.dialog('TechradarAdd', require('./dialogs/radar/add')).triggerAction({
  matches: 'Techradar.Add'
});
bot.dialog('TechradarWho', require('./dialogs/radar/who')).triggerAction({
  matches: 'Techradar.Who'
});
bot.dialog('help', require('./support')).triggerAction({
  matches: 'Help'
});
