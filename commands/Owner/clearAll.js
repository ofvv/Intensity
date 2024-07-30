const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif } = require("../../config.json")

module.exports = {
    name: "clearall",
    aliases: ["nuke", "clear"],
    category: "Owner",
    usage: "sj!clearall",
    description: "Clear The Channel!",
    run: async (client, message, args) => {

      let ziroid = `484701017015975936`

      let owners = [ziroid, ownerid]

      if(!owners.includes(message.author.id)) return message.channel.send("**Only Owners Can Use This Command!**")


    let channel = message.channel;

    let ziro = client.users.cache.get(ziroid)

    const embed = new MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/628197645537771530/833588397351764038/cleared.gif`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)

    channel.clone().then((channel2) => {

    channel2.setPosition(channel.position)

    channel.delete()

    channel2.send(`**<@${message.author.id}> Deleted All The Messages in <#${channel2.id}>!**`, embed)
  })

    }
}
