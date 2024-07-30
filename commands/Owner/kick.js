const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif } = require("../../config.json")

module.exports = {
    name: "kick",
    aliases: [""],
    category: "Owner",
    usage: "sj!kick",
    description: "Kick Someone",
    run: async (client, message, args) => {

      let ziroid = `484701017015975936`

      let owners = [ziroid, ownerid]

      if(!owners.includes(message.author.id)) return message.channel.send("**Only Owners Can Use This Command!**")

      if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      let embed = new discord.MessageEmbed()
      .setColor(color)
      .setDescription("**I Need Kick Members Permission To Work!**");
      return message.channel.send(embed)
  }

let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0])
  if(!user) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**Choose a User To Kick!**");
    return message.channel.send(embed)
  }

  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**You Can't Kick Yourself!**")
    return message.channel.send(embed)
  }

  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**I Can't Kick This User!**")
    return message.channel.send(embed)
  }

  let reason = args.slice(1).join(" ");
  if(!reason) {
    reason = "No Reason."
  }
  user.kick({ reason: reason });

  let ziro = client.users.cache.get(ziroid)

    var embed = new discord.MessageEmbed()
    .setDescription(`**${user.user.username} Was Kicked!**`)
    .addField(`Moderator:`, `**${message.author.tag}**`)
    .addField(`Reason:`, `**${reason}**`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
    .setColor(color)
    message.channel.send(embed)

    }}
