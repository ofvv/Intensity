const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const https = require("https")
const fetch = require("node-fetch")

module.exports = {
    name: "tags",
    aliases: ["t"],
    category: "Fivem",
    usage: "sj!tags",
    description: "Fivem Tags",
    run: async (client, message, args, prefix) => {
      var code = args[0]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {
                    if(out["Data"]["vars"]["tags"] && out["Data"]["hostname"]){

                        var tags = out["Data"]["vars"]["tags"]
                        var name = out["Data"]["hostname"]

                        const mensaje = new discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor(color || `#000001`)
                        .addField("Server Name", `\`${name}\``.substring(0, 390))
                        .addField("Server Tags", `\`${tags}\``.substring(0, 1024))
                        .setFooter(`${client.user.username}`)
                        message.channel.send(mensaje);

                    }else{
                        const mensaje = new discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setColor(color || `#000001`)
                        .setDescription("```\n Cannot find server tags```")
                        message.channel.send(mensaje);
                    }

                })
    }}
