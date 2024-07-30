const Discord = require("discord.js");
const { Util, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "leave",
    aliases: ["l"],
    category: "Owner",
    usage: "sj!l",
    description: "Resume",
    run: async (client, message, args, prefix) => {
      let channel = message.member.voice.channel;
        if (!channel) return message.channel.send("**You Are Not In a Voice Channel!**", message.channel);
        if (!message.guild.me.voice.channel) return message.channel.send("**I'm Not In Voice!**", message.channel);

        try {
            await message.guild.me.voice.channel.leave();
        } catch (error) {
            await message.guild.me.voice.kick(message.guild.me.id);
            return message.channel.send("**Leaving...**", message.channel);
        }

        const Embed = new MessageEmbed()
            .setColor(color || `#000001`)
            .setDescription("**I Left**")

        return message.channel.send(Embed).catch(() => message.channel.send("**I Left!**"));
    }
  }
