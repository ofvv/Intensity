const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const https = require("https")
const fetch = require("node-fetch")

module.exports = {
    name: "ip",
    aliases: ["i"],
    category: "Fivem",
    usage: "sj!ip",
    description: "Fivem IP",
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
                    const mensaje = new discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setColor(color || `#000001`)
                    .addField("IP:Port", `\`${out["Data"]["connectEndPoints"][0]}\``)
                    .setFooter(`${client.user.username}`)
                    message.channel.send(mensaje);
                })
            }

        })
    }}
