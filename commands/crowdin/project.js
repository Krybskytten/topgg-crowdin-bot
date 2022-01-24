const config = require ("./../../botconfig/config.json")
const desired_channel = config.desired_channel;
const crowdin_token = config.crowdin_token;
const crowdin_project_id = config.crowdin_project_id;

const fetch = require('node-fetch');

const settings = require ("./../../botconfig/settings.json")
const embed_colour = settings.embed_colour;
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "project",
	description: 'General information about the top.gg project from Crowdin.',
	usage: 'project',
	permissions: 'SEND_MESSAGES',
	guildOnly: true,
    cooldown: 5,



	execute(message, args) {
        if (message.channel.id != `${desired_channel}`) return;
            
        const croapi = `https://api.crowdin.com/api/v2/projects/${crowdin_project_id}`
                fetch(croapi)
                .then(res => res.json()).then(json => {
                if (json.error.code == 200) {
                        return res.json();
                    } else if (json.error.code == 401 && 403 && 404 && 405) {
                        let errorembed = new MessageEmbed()
                        .setColor(`#ffa000`)
                        .setDescription(`**Error: ${json.error.message}.**\nStatus code: ${json.error.code}.`)
                        .setTimestamp()   
                        return message.channel.send({ content: `${errorembed}` });   
                    } else {
                    
                console.log(json)
            //    let croembed = new MessageEmbed()
            //        .addField("**Name:**", `${json.name[0]}`)
                //    .addField("**World**:", `${json.mythic_plus_ranks.class.world}`, true)
                //    .addField("**Region**:", `${json.mythic_plus_ranks.class.region}`, true)
                //    .addField("**Realm**:", `${json.mythic_plus_ranks.class.realm}`, true)
                //    .addField("**Tank:**", `<:tank:793236426849779782>${json.mythic_plus_scores_by_season[0].scores.tank}`, true)
                //    .addField("**Healer:**", `<:healer:793236426501914665>${json.mythic_plus_scores_by_season[0].scores.healer}`, true)
                //    .addField("**Dps:**", `<:dps:793236426762092554>${json.mythic_plus_scores_by_season[0].scores.dps}`, true)
        
        
            //    message.channel.send({ content: `${croembed}` });                        
                };
        
            });	
        },
};

