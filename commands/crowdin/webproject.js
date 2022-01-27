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

module.exports = {
    name: "webproject",
    description: 'General information about the top.gg webproject from Crowdin.',
    usage: 'webproject',
    permissions: 'SEND_MESSAGES',
    guildOnly: true,
    cooldown: 5,


    execute(message, args) {
        if (message.channel.id != `${desired_channel}`) return;
            
                fetch(`https://api.crowdin.com/api/v2/projects/${crowdin_webproject_id}`, {
                  method: 'GET', 
                  headers: {'content-type': 'application/json', authorization: `Bearer ${crowdin_token}`}
                })
                .then(res => res.json()).then(json => {
                // console.log(json);
                if (`${json.error.code}` === "401" || "403" || "404" || "405") return message.reply(`Something went wrong at this time.\n **Error:** ${json.error.code} (${json.error.message})`)
                
                  var english = `${json.data.sourceLanguageId}`
                  var english2 = english.replace("en", ":flag_gb:")
                  var romanian = `${json.data.targetLanguageIds[0]}`
                  var romanian2 = romanian.replace("ro", ":flag_ro:")
                  var french = `${json.data.targetLanguageIds[1]}`
                  var french2 = french.replace("fr", ":flag_fr:") 
                  var spanish = `${json.data.targetLanguageIds[2]}`
                  var spanish2 = spanish.replace("es-ES", ":flag_es:")
                  var arabic = `${json.data.targetLanguageIds[3]}`
                  var arabic2 = arabic.replace("ar", ":flag_ae:")
                  var czech = `${json.data.targetLanguageIds[4]}`
                  var czech2 = czech.replace("cs", ":flag_cz:")
                  var danish = `${json.data.targetLanguageIds[5]}`
                  var danish2 = danish.replace("da", ":flag_dk:")
                  var german = `${json.data.targetLanguageIds[6]}`
                  var german2 = german.replace("de", ":flag_de:")
                  var greek = `${json.data.targetLanguageIds[7]}`
                  var greek2 = greek.replace("el", ":flag_gr:")
                  var finish = `${json.data.targetLanguageIds[8]}`
                  var finish2 = finish.replace("fi", ":flag_fi:")
                  var irish = `${json.data.targetLanguageIds[9]}` 
                  var irish2 = irish.replace("ga-IE", ":flag_ie:") 
                  var hebrew = `${json.data.targetLanguageIds[10]}`
                  var hebrew2 = hebrew.replace("he", ":flag_il: ")
                  var hungarian = `${json.data.targetLanguageIds[11]}`
                  var hungarian2 = hungarian.replace("hu", ":flag_hu:")
                  var italian = `${json.data.targetLanguageIds[12]}`
                  var italian2 = italian.replace("it", ":flag_it:")
                  var japanese = `${json.data.targetLanguageIds[13]}`
                  var japanese2 = japanese.replace("ja", ":flag_jp:")
                  var korean = `${json.data.targetLanguageIds[14]}`
                  var korean2 = korean.replace("ko", ":flag_kr:")
                  var kurdish = `${json.data.targetLanguageIds[15]}` // NO FLAG
                  var kurdish2 = kurdish.replace("ku", ":flag_white: (Kurdish)") // NO FLAG
                  var dutch = `${json.data.targetLanguageIds[16]}`
                  var dutch2 = dutch.replace("nl", ":flag_nl:")
                  var norwegian = `${json.data.targetLanguageIds[17]}`
                  var norwegian2 = norwegian.replace("no", ":flag_no:")
                  var polish = `${json.data.targetLanguageIds[18]}`
                  var polish2 = polish.replace("pl", ":flag_pl:")
                  var russian = `${json.data.targetLanguageIds[19]}`
                  var russian2 = russian.replace("ru", ":flag_ru:")
                  var swedish = `${json.data.targetLanguageIds[20]}`
                  var swedish2 = swedish.replace("sv-SE", ":flag_se:")
                  var turkish = `${json.data.targetLanguageIds[21]}`
                  var turkish2 = turkish.replace("tr", ":flag_tr:")
                  var ukrainian = `${json.data.targetLanguageIds[22]}`
                  var ukrainian2 = ukrainian.replace("uk", ":flag_ua:")
                  var vietnamese = `${json.data.targetLanguageIds[23]}`
                  var vietnamese2 = vietnamese.replace("vi", ":flag_vn:")                 
                  var brazilian = `${json.data.targetLanguageIds[24]}`
                  var brazilian2 = brazilian.replace("pt-BR", ":flag_br:")
                  var indonesian = `${json.data.targetLanguageIds[25]}`
                  var indonesian2 = indonesian.replace("id", ":flag_id:")
                  var persian = `${json.data.targetLanguageIds[26]}` // NO FLAG
                  var persian2 = persian.replace("fa", ":flag_white: (Persian)") // NO FLAG
                  var bengali = `${json.data.targetLanguageIds[27]}` 
                  var bengali2 = bengali.replace("bn", ":flag_bd:")
                  var azerbaijani = `${json.data.targetLanguageIds[28]}`
                  var azerbaijani2 = azerbaijani.replace("az", ":flag_az:")
                  var hindi = `${json.data.targetLanguageIds[29]}`
                  var hindi2 = hindi.replace("hi", ":flag_in:")  
                  var malay = `${json.data.targetLanguageIds[30]}`
                  var malay2 = malay.replace("ms", ":flag_ms:") 
                  var filipino = `${json.data.targetLanguageIds[31]}`
                  var filipino2 = filipino.replace("fil", ":flag_ph:")         
                  var quebec = `${json.data.targetLanguageIds[32]}` // NO FLAG
                  var quebec2 = quebec.replace("fr-QC", ":flag_white: (French, Québec)") // NO FLAG
                  var sorani = `${json.data.targetLanguageIds[33]}`// NO FLAG
                  var sorani2 = sorani.replace("ckb", ":flag_white: (Sorani, Kurdish)") // NO FLAG
                  var scots = `${json.data.targetLanguageIds[34]}`
                  var scots2 = scots.replace("sco", ":scotland:")
                  
                  let successembed = new MessageEmbed()

                        .setColor(`${embed_colour}`)
                        .addField("General", `\n **Name:** ${json.data.name} \n **Description:** ${json.data.description} \n **Last activity:** ${json.data.lastActivity}  `)
                        .setThumbnail(`${json.data.logo}`)
                        .addField("Languages", `${english2} | ${romanian2} | ${french2} | ${spanish2} | ${arabic2} | ${czech2} | ${danish2} | ${german2} | ${greek2} | ${finish2} | ${irish2} | ${hebrew2} | ${hungarian2} | ${italian2} | ${japanese2} | ${korean2} | ${dutch2} | ${norwegian2} | ${polish2} | ${russian2} | ${swedish2} | ${turkish2} | ${ukrainian2} | ${vietnamese2} | ${brazilian2} | ${indonesian2} | ${bengali2} | ${azerbaijani2} | ${hindi2} | ${malay2} | ${filipino2} | ${scots2}`, true)
                        .addField("Other languages", `${quebec2} \n ${persian2} \n ${kurdish2} \n  ${sorani2} `)
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

