if (Number(process.version.slice(1).split(".")[0]) < 16)
  throw new Error(
    "Node 16.0.0 or higher is required. Update Node on your system."
  );

// *********************************************
/*                     MISC                    */

const fs = require('fs-extra')
const colors = require("colors");
console.log(colors.random("Trying to boot..."));
// *********************************************

// *********************************************
/*              BOT INITIALIZATION             */

const config = require(`./botconfig/config.json`);

const discord_token = config.discord_token;
const crowdin_token = config.crowdin_token;
const prefix = config.prefix;
const crowdin_webproject_id = config.crowdin_webproject_id;
const crowdin_backendproject_id = config.crowdin_backendproject_id;
const desired_channel = config.desired_channel;

if (!discord_token) return console.log(`You haven't set your Discord Token in the config.json file!`.red);
if (!crowdin_token) return console.log(`You haven't set your Crowdin Token in the config.json file!`.red);
if (!prefix) return console.log(`You haven't set your Bot Prefix in the config.json file!`.red);
if (!crowdin_webproject_id) return console.log(`You haven't set your Crowdin Webproject Id in the config.json file!`.red);
if (!crowdin_backendproject_id) return console.log(`You haven't set your Crowdin Backendproject Id in the config.json file!`.red);
if (!desired_channel) return console.log(`You haven't set your Desired Command Channel in the config.json file!`.red);

const Discord = require("discord.js");
const client = new Discord.Client({
    shards: "auto",
    allowedMentions: {
      parse: [ ],
      repliedUser: false,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [ // https://discord.com/developers/docs/topics/gateway#gateway-intents
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        // Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        // Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        // Discord.Intents.FLAGS.GUILD_INVITES,
        // Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        // Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        // Discord.Intents.FLAGS.DIRECT_MESSAGES,
        // Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
    presence: {
      activity: {
        name: `Booting...`,
        type: "CUSTOM",
      },
      status: "online"
    }
});

// *********************************************

// *********************************************
/*                 COLLECTIONS                 */

client.commands = new Discord.Collection();
client.buttonCommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.triggers = new Discord.Collection();

// *********************************************

// *********************************************
/*                   EVENTS                    */

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

// *********************************************

// *********************************************
/*                  COMMANDS                   */

const commandFolders = fs.readdirSync("./commands");

// Loop through all files and store commands in commands collection.

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// *********************************************

// *********************************************
/*                   BUTTONS                   */

const buttonCommands = fs.readdirSync("./interactions/buttons");

// Loop through all files and store button-commands in buttonCommands collection.

for (const module of buttonCommands) {
	const commandFiles = fs
		.readdirSync(`./interactions/buttons/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./interactions/buttons/${module}/${commandFile}`);
		client.buttonCommands.set(command.id, command);
	}
}

// *********************************************

// *********************************************
/*                   TRIGGERS                  */
const triggerFolders = fs.readdirSync("./triggers");

// Loop through all files and store commands in commands collection.

for (const folder of triggerFolders) {
	const triggerFiles = fs
		.readdirSync(`./triggers/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of triggerFiles) {
		const trigger = require(`./triggers/${folder}/${file}`);
		client.triggers.set(trigger.name, trigger);
	}
}

// *********************************************





client.login(discord_token)

