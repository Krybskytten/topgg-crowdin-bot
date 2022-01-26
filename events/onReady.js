	/**
	* @description Status change + message in console that the bot is started.
	* @author Krybskytten
	*/

const config = require ("../botconfig/config.json")
const prefix = config.prefix;
module.exports = {
    name: "ready",
    once: "true",

    execute(client) {
        console.log(`${client.user.username} is online!`.green)

        let statuses = [
            `@${client.user.tag}`,
            `${prefix}help`
            ]

            setInterval(function() {
                let status = statuses[Math.floor(Math.random() * statuses.length)];
                client.user.setActivity(status, {type: "WATCHING"});
            }, 15000)

    },
    
};