const config = require ("../botconfig/config.json")
const prefix = config.prefix;

 module.exports = {
     async execute(message) {
         return message.channel.send(
             `Hi ${message.author}! My help command is: \`${prefix}help\``
         );
     },
 };