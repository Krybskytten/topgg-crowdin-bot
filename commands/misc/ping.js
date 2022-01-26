	/**
	* @description Ping - to test the bot.
	* @author Krybskytten
	*/

const config = require ("./../../botconfig/config.json")
const desired_channel = config.desired_channel;

module.exports = {
	name: "ping",
	description: 'ms',
	usage: 'ping',
	permissions: 'SEND_MESSAGES',
	guildOnly: true,
    cooldown: 5,

	execute(message, args) {
        if (message.channel.id != `${desired_channel}`) return;

		message.channel.send({ content: "Pong." });
	},
};