const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif } = require("../../config.json")

module.exports = {
    name: "hackban",
    aliases: [""],
    category: "Owner",
    usage: "sj!hackban",
    description: "Ban Someone That Isn't In The Server!",
    run: async (client, message, args) => {

      let ziroid = `484701017015975936`

      let owners = [ziroid, ownerid]

      if(!owners.includes(message.author.id)) return message.channel.send("**Only Owners Can Use This Command!**")

      if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      let embed = new discord.MessageEmbed()
      .setColor(color)
      .setDescription("**I Need Ban Members Permission To Work!**");
      return message.channel.send(embed)
  }

let id = args[0]
  if(!id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**Please Provide a User ID!**");
    return message.channel.send(embed)
  }

  if(id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**You Can't Ban Yourself!**")
    return message.channel.send(embed)
  }

  let ziro = client.users.cache.get(ziroid)

  message.guild.members.ban(id).then(user => {

    var embed = new discord.MessageEmbed()
    .setDescription(`**${user.tag} Was Banned!**`)
    .addField(`Moderator:`, `**${message.author.tag}**`)
    .setImage(`https://cdn.discordapp.com/attachments/744497976235524107/833722630854672454/banned.gif`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
    .setColor(color)
    message.channel.send(embed)

})
    }}
