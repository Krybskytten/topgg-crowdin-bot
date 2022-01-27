	/**
	* @description Fetches information about the TOP.GG webproject.
	* @author Krybskytten
	*/

    /*const config = require ("../../botconfig/config.json")
    const desired_channel = config.desired_channel;
    const crowdin_token = config.crowdin_token;
    const crowdin_webproject_id = config.crowdin_webproject_id;
    
    const fetch = require('node-fetch');
    
    const settings = require ("../../botconfig/settings.json")
    const embed_colour = settings.embed_colour;
    const { MessageEmbed } = require("discord.js");
    
    module.exports = {
        name: "webstats",
        description: 'General information about the top.gg webproject from Crowdin.',
        usage: 'webstats',
        permissions: 'SEND_MESSAGES',
        guildOnly: true,
        cooldown: 5,
    
    
        execute(message, args) {
            if (message.channel.id != `${desired_channel}`) return;
                
                    fetch(`https://api.crowdin.com/api/v2/projects/${crowdin_webproject_id}/languages/progress`, {
                      method: 'GET', 
                      headers: {'content-type': 'application/json', authorization: `Bearer ${crowdin_token}`}
                    })
                    .then(res => res.json()).then(json => {
                     console.log(json);
                    if (`${json.error.code}` === "401" || "403" || "404" || "405" || "503") return message.reply(`Something went wrong at this time.\n **Error:** ${json.error.code} (${json.error.message})`)

                      let successembed = new MessageEmbed()
    
                            .setColor(`${embed_colour}`)
                            .addField("General", `${json.data.data.translationprogress} **Name:** `)
                            .setTimestamp()  
                            return message.channel.send({ embeds: [successembed] })  
                    })
                    .catch((error) => {
                      console.error(error);
                      let errorembed = new MessageEmbed()
                            .setColor(`${embed_colour}`)
                            .setDescription(`An error occoured.`)
                            .setTimestamp()   
                            return message.channel.send({ embeds: [errorembed] })  
                    }); 
            },
    };
    
 */   