	/**
	* @description Help message.
	* @author Naman Vrati
	*/

const config = require ("./../../botconfig/config.json")
const prefix = config.prefix;
const desired_channel = config.desired_channel;

const settings = require ("./../../botconfig/settings.json")
const embed_colour = settings.embed_colour;
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	description: "List all commands of bot or info about a specific command.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client;

		if (message.channel.id != `${desired_channel}`) return;

		if (!args.length) { // no args = full command
	
			let helpEmbed = new MessageEmbed()
				.setColor(`${embed_colour}`)
				.setURL(process.env.URL)
				.setTitle("List of all my commands")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addField(
					"Usage",
					`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
				);

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === "dm") return;

					// On validation, reply back.

					message.reply({
						content: "I've sent you a DM with all my commands!",
					});
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(
						`Could not send help DM to ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "It seems like I can't DM you!" });
				});
		}

		// If argument is provided, check if it's a command.

		/**
		 * @type {String}
		 * @description First argument in lower case
		 */

		const name = args[0].toLowerCase();

		/**
		 * @type {Object}
		 * @description The command object
		 */

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		// If it's an invalid command.

		if (!command) {
			return message.reply({ content: "That's not a valid command!" });
		}

		/**
		 * @type {Object}
		 * @description Embed of Help command for a specific command.
		 */

		let commandEmbed = new MessageEmbed()
			.setColor(`${embed_colour}`)
			.setTitle("Command Help");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed
				.addField("Aliases", `\`${command.aliases.join(", ")}\``, true)
				.addField("Cooldown", `${command.cooldown || 3} second(s)`, true);
		if (command.usage)
			commandEmbed.addField(
				"Usage",
				`\`${prefix}${command.name} ${command.usage}\``,
				true
			);

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] });
	},
};