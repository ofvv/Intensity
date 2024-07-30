const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const https = require("https")
const fetch = require("node-fetch")

module.exports = {
    name: "find",
    aliases: ["m"],
    category: "Fivem",
    usage: "sj!find",
    description: "Fivem Find",
    run: async (client, message, args, prefix) => {
      var code = args[0]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        https.get(urlfivem, function(res) {
            if(res.statusCode == 404){

                const mensaje = new discord.MessageEmbed()
                .setColor(color || `#000001`)
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription("```\n Invalid Code```")
                .setFooter(`${client.user.username}`)
                message.channel.send(mensaje);

            }else{
                fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {

                    if(!out["Data"]["connectEndPoints"][0].startsWith("http")){

                        var split =  `${out["Data"]["connectEndPoints"][0]}`.split(":")
                        var urlip = "http://ip-api.com/json/"+split[0]
                        fetch(urlip)
                        .then(res => res.json())
                        .then((out2) => {

                        if(out["icon"]){
                            var icon = out2["icon"]
                            let file = new Buffer.from(icon, 'base64')
                            const att = new discord.MessageAttachment(file, "graph.png")
                            const mensaje = new discord.MessageEmbed()

                            .setColor(color || `#000001`)
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter(`${client.user.username}`)
                            .setThumbnail("attachment://graph.png")
                            .attachFiles(att)

                            message.channel.send(mensaje);
                        }else{
                            const mensaje = new discord.MessageEmbed()
                            .setColor(color || `#000001`)
                            .setAuthor(message.author.tag, message.author.avatarURL())
                            .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                            .addField("Server Details", `IP: \`${split[0]}\`\n Country: \`${out2["country"]}\`\n City: \`${out2["city"]}\`\n ISP: \`${out2["isp"]}\`\n Org: \`${out2["org"]}\`\n Zip Code: \`${out2["zip"]}\`\n Timezone: \`${out2["timezone"]}\`\n`)
                            .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                            .setFooter(`${client.user.username}`)
                            message.channel.send(mensaje);
                        }


                        })

                    }else{
                        const mensaje = new discord.MessageEmbed()
                        .setColor(color || `#000001`)
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription("```\n Cannot find server details...```")
                        .addField("Cfx Url", `\`${out["Data"]["connectEndPoints"][0]}\``)
                        .addField("FiveM Server", `Server Name: \`${out["Data"]["hostname"].substring(0, 390)}\`\n\n Online Players: \`${out["Data"]["players"].length}\`\n Max Players: \`${out["Data"]["svMaxclients"]}\`\n Artifacts: \`${out["Data"]["server"]}\`\n Resources: \`${out["Data"]["resources"].length}\`\n Onesync Enabled?: \`${out["Data"]["vars"]["onesync_enabled"]}\`\n`, true)
                        .setFooter(`${client.user.username}`)
                        message.channel.send(mensaje);
                    }
                })
            }

        })
    }
  }
