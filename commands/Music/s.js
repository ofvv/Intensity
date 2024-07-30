const Discord = require("discord.js");
const { Util, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "pause",
    aliases: ["s"],
    category: "Owner",
    usage: "s!pause",
    description: "Pause a Song",
    run: async (client, message, args, prefix) => {
      let channel = message.member.voice.channel;
              if (!channel) return message.channel.send("**You Need To Join a Voice Channel First!**");
      const serverQueue = message.client.queue.get(message.guild.id);
          if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
      	    try{
            serverQueue.connection.dispatcher.pause()
      	  } catch (error) {
              message.client.queue.delete(message.guild.id);
              return message.channel.send(`**An Error Has Occured!**: ${error}`, message.channel);
            }
            let xd = new MessageEmbed()
            .setDescription("**Paused!**")
            .setColor(color || `#000001`)
            return message.channel.send(xd);
          }
          return message.channel.send("**There Arent Any Songs Playing!**", message.channel);
    }
  }
