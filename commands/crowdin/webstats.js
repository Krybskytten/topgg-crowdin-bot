	/**
	* @description Fetches information about the TOP.GG webproject.
	* @author Krybskytten
	*/

    const config = require ("../../botconfig/config.json")
    const desired_channel = config.desired_channel;
    const crowdin_token = config.crowdin_token;
    const crowdin_webproject_id = config.crowdin_webproject_id;
    
    const fetch = require('node-fetch');
    
    const settings = require ("../../botconfig/settings.json")
    const embed_colour = settings.embed_colour;
    const { MessageEmbed } = require("discord.js");
    const progressbar = require('string-progressbar');

    module.exports = {
        name: "webstats",
        description: 'General information about the top.gg webproject from Crowdin.',
        usage: 'webstats',
        permissions: 'SEND_MESSAGES',
        guildOnly: true,
        cooldown: 5,
    
    
        execute(message, args) {
            if (message.channel.id != `${desired_channel}`) return;
                const languageID = "da"
                const params = { limit: '500', offset: '0' };
                const urlParams = new URLSearchParams(Object.entries(params)); 
                    fetch(`https://api.crowdin.com/api/v2/projects/${crowdin_webproject_id}/languages/${languageID}/progress?` + urlParams, {
                      method: 'GET', 
                      headers: {'content-type': 'application/json', authorization: `Bearer ${crowdin_token}`},
                    })
                    .then(res => res.json()).then(json => {
                    console.log(json);
                    const statObjects = json;
                    const firstDataObject = statObjects.data[0].data
                  //  const secondDataObject = statObjects.data[1].data
                    console.log(firstDataObject);
                  //  console.log(secondDataObject);

                    var total = 100;
                    var currentget = `${firstDataObject.translationProgress}`
                    var currentget2 = `${firstDataObject.approvalProgress}`
                    var current = currentget; 
                    var current2 = currentget2;
          
                      let successembed = new MessageEmbed()
    
                            .setColor(`${embed_colour}`)
                            .addField("Progress", `Translation progress: ${currentget}/${total}%\n ${progressbar.splitBar(total, current, [size = 20])}\n Total approved: ${currentget2}/${total}%\n ${progressbar.splitBar(total, current2, [size = 20])}`)
                            .addField("Total words", `[${firstDataObject.words.total}](https://crowdin.com/translate/topgg/${firstDataObject.fileId}/en-${languageID}) `, true)
                            .addField("Total translated",`[${firstDataObject.words.translated}](https://crowdin.com/translate/topgg/${firstDataObject.fileId}/en-${languageID}) `, true)
                            .addField("Total approved",`[${firstDataObject.words.approved}](https://crowdin.com/translate/topgg/${firstDataObject.fileId}/en-${languageID}) `, true)
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
    
   