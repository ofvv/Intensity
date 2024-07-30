const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const https = require("https")
const fetch = require("node-fetch")

module.exports = {
    name: "logo",
    aliases: ["fl"],
    category: "Fivem",
    usage: "sj!logo",
    description: "Fivem Logo",
    run: async (client, message, args, prefix) => {

        var code = args[0]
        var urlfivem = "https://servers-live.fivem.net/api/servers/single/"+code
        fetch(urlfivem)
                .then(res => res.json())
                .then((out) => {

                        if(!out["Data"]["connectEndPoints"][0].startsWith("http")){
                            var urlip = `http://${out["Data"]["connectEndPoints"][0]}/info.json`

                                fetch(urlip)
                                .then(res => res.json())
                                .then((out2) => {

                                    var icon = out2["icon"]
                                    let file = new Buffer.from(icon, 'base64')
                                    const att = new discord.MessageAttachment(file, "icon.png")
                                    const mensaje = new discord.MessageEmbed()

                                    .setColor(color || `#000001`)
                                    .setAuthor(message.author.tag, message.author.avatarURL())
                                    //.setDescription("Image from server")
                                    .setImage("attachment://icon.png")
                                    //.setThumbnail("attachment://graph.png")
                                    .attachFiles(att)

                                    message.channel.send(mensaje);
                                })

                        }

                })
    }}
