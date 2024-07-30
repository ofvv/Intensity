const discord = require("discord.js");
const { MessageEmbed } = require("discord.js")
const { ownerid, color, gif, dbLink, mutedrole, roleid } = require("../../config.json")
const { Database } = require('quickmongo');
const db = new Database(dbLink)

module.exports = {
    name: "unmute",
    aliases: [""],
    category: "Owner",
    usage: "sj!unmute",
    description: "Unmute Someone",
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
    .setDescription("**Choose a User To Unmute!**");
    return message.channel.send(embed)
  }

  let checked = await db.get(`muted_${user.id}`)

  if (!checked) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**This User Is Not In Our Database!**");
    return message.channel.send(embed)
  }

  if (!user.roles.cache.has(mutedrole)) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**This User Doesn't Have The Muted Role!**");
    return message.channel.send(embed)
  }

  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**You Can't Unmute Yourself!**")
    return message.channel.send(embed)
  }

  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(color)
    .setDescription("**I Can't Unmute This User!**")
    return message.channel.send(embed)
  }

  let reason = args.slice(1).join(" ");
  if(!reason) {
    reason = "No Reason."
  }
  await user.roles.remove(mutedrole).catch(() => {})
  await db.delete(`muted_${user.id}`)
  await user.roles.add(roleid).catch(() => {})

  let ziro = client.users.cache.get(ziroid)

    var embed = new discord.MessageEmbed()
    //.setDescription(`**${user.user.username} Was Unmuted!**`)
    .addField(`Moderator:`, `**${message.author.tag}**`)
    .addField(`Reason:`, `**${reason}**`)
    .setFooter(`Command By ${ziro ? ziro.tag : 'Ziroトト#9200'} | github.com/ZiroCore`)
    .setColor(color)
    message.channel.send(embed)


    }}
