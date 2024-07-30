const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif, dbLink, mutedrole, roleid } = require("../../config.json")
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: "mute",
    aliases: [""],
    category: "Owner",
    usage: "sj!mute",
    description: "Mute Someone",
    run: async (client, message, args) => {

      let ziroid = `484701017015975936`

      let owners = [ziroid, ownerid]

      if(!owners.includes(message.author.id)) return message.channel.send("**Only Owners Can Use This Command!**")

      if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new discord.MessageEmbed()
      .setColor(color)
      .setDescription("**I Need `MANAGE_ROLES` Permission To Work!**");
      return message.channel.send(embed)
  }

let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0])
  if(!user) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**Choose a User To Mute!**");
    return message.channel.send(embed)
  }

  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**You Can't Mute Yourself!**")
    return message.channel.send(embed)
  }

  let reason = args.slice(1).join(" ");
  if(!reason) {
    reason = "No Reason."
  }

  if (user.roles.cache.has(mutedrole)) {
    var embed = new discord.MessageEmbed()
    .setDescription(`**${user.user.username} Is Already Muted!**`)
    .setColor(color)
    return message.channel.send(embed)
  }

  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**I Can't Mute This User!**")
    return message.channel.send(embed)
  }

  await user.roles.add(mutedrole).catch(() => {})
  await db.set(`muted_${user.id}`, user.id)
  await user.roles.remove(roleid).catch(() => {})

  let ziro = client.users.cache.get(ziroid)

    var embed = new discord.MessageEmbed()
    //.setDescription(`**${user.user.username} Was Muted!**`)
    .addField(`Moderator:`, `**${message.author.tag}**`)
    .addField(`Reason:`, `**${reason}**`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
    .setColor(color)
    message.channel.send(embed)


    }}
