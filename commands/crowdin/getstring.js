	/**
	* @description Fetches information about about a string from the TOP.GG translation project.
	* @author Krybskytten
	*/

    const config = require ("../../botconfig/config.json")
    const prefix = config.prefix;
    const desired_channel = config.desired_channel;
    const crowdin_token = config.crowdin_token;
    const crowdin_webproject_id = config.crowdin_webproject_id;
    const crowdin_backendproject_id = config.crowdin_backendproject_id;

    const fetch = require('node-fetch');
    
    const settings = require ("../../botconfig/settings.json")
    const embed_colour = settings.embed_colour;
    const { MessageEmbed } = require("discord.js");
    
    module.exports = {
        name: "getstring",
        description: 'Information about a string from the TOP.GG translation project.',
        usage: 'getstring',
        permissions: 'SEND_MESSAGES',
        guildOnly: true,
        cooldown: 5,
    
    
        execute(message, args) {
            if (message.channel.id != `${desired_channel}`) return;
                
                let rest_of_the_string = message.content.slice(`${prefix}getstring `.length); //removes the first part = space after "getstring" is intentional for now.
                let array_of_arguments = rest_of_the_string.split(',');
                
                let project = array_of_arguments[0]
                let stringID = array_of_arguments[1]
                
              
                let noticeembed = new MessageEmbed()
                .setColor(`${embed_colour}`)
                .setDescription(`⚠ Usage: \`${prefix}getstring <web/backend>, <string id>\`. project must either be ***web*** or ***backend*** .\nExample: \`${prefix}getstring web,11423\``)
                .setTimestamp()

                if (!project) return message.reply({ embeds: [noticeembed] })  
                if (!stringID) return message.reply({ embeds: [noticeembed] })  
                                
                if (project === "web") {
                    project = `${crowdin_webproject_id}`;
                  } 
                
                if (project === "backend") {
                    project = `${crowdin_backendproject_id}`;
                  }

                    fetch(`https://api.crowdin.com/api/v2/projects/${project}/strings/${stringID}`, {
                      method: 'GET', 
                      headers: {'content-type': 'application/json', authorization: `Bearer ${crowdin_token}`}
                    })
                    .then(res => res.json()).then(json => {
                    // console.log(json)  
                    if (`${json.error.code}` === "401" || "403" || "404" || "405" || "503") return message.reply(`Something went wrong at this time.\n **Error:** ${json.error.code} (${json.error.message})`)

                      let successembed = new MessageEmbed()
                            .setColor(`${embed_colour}`)
                            .addField("General", `ID: ${json.data.id} `)
                            .addField("SOURCE STRING", `${json.data.text}`)
                            .addField("CONTEXT", `${json.data.context}`)
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
    
    