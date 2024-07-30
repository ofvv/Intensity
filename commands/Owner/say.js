const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif } = require("../../config.json")

module.exports = {
    name: "say",
    aliases: ["sayy"],
    category: "Owner",
    usage: "sj!say",
    description: "Say Something",
    run: async (client, message, args) => {
      let ziroid = `484701017015975936`

      let owners = [
        ziroid,
        ownerid
      ]

      if(!owners.includes(message.author.id)) return message.channel.send("**Only Owners Can Use This Command!**")
      
      let text = args.join(" ")

      if (!text) {
        return message.channel.send(`**Say Something!**`)
      }

      const embed = new MessageEmbed()
      .setThumbnail(gif || client.user.avatarURL({ dynamic: true }))
      .setDescription(text)
      .setColor(color)
      message.channel.send(embed)

    }
};
