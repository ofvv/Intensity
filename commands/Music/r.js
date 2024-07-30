const Discord = require("discord.js");
const { Util, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "resume",
    aliases: ["r"],
    category: "Owner",
    usage: "sj!r",
    description: "Resume",
    run: async (client, message, args, prefix) => {
      const serverQueue = message.client.queue.get(message.guild.id);
          if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            let xd = new MessageEmbed()
            .setDescription("**Resumed!**")
            .setColor(color || `#000001`)
            return message.channel.send(xd);
          }
          return message.channel.send("**There Is Nothing Playing/The Queue Isn't Paused!**", message.channel);
    }
  }
