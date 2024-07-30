const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif } = require("../../config.json")

module.exports = {
    name: "ban",
    aliases: [""],
    category: "Owner",
    usage: "sj!ban",
    description: "Ban Someone",
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

let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0])
  if(!user) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**Choose a User To Ban!**");
    return message.channel.send(embed)
  }

  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**You Can't Ban Yourself!**")
    return message.channel.send(embed)
  }

  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**I Can't Ban This User!**")
    return message.channel.send(embed)
  }

  let reason = args.slice(1).join(" ");
  if(!reason) {
    reason = "No Reason."
  }
  user.ban({ reason: reason });

  let ziro = client.users.cache.get(ziroid)

    var embed = new discord.MessageEmbed()
    .setDescription(`**${user.user.username} Was Banned!**`)
    .addField(`Moderator:`, `**${message.author.tag}**`)
    .addField(`Reason:`, `**${reason}**`)
    .setImage(`https://cdn.discordapp.com/attachments/744497976235524107/833722630854672454/banned.gif`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
    .setColor(color)
    message.channel.send(embed)


    }}
